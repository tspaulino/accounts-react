/**
 * Webpack configuration
 *
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

import webpack from 'webpack'
import merge from 'webpack-merge'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import { argv } from 'yargs'
import { resolve } from 'path'

export const CURRENT_ENV = argv.env
export const IS_DEV = CURRENT_ENV === 'development'
export const IS_TEST = CURRENT_ENV === 'test'
export const IS_PROD = CURRENT_ENV === 'production'

export const DEV_SERVER = {
  host: 'http://localhost',
  port: 5000,
  uiPort: 5011,
  autoOpen: false,
}

const entry = () => {
  const appPath = [resolve(__dirname, '../src')]
  const serverPaths = ['react-hot-loader/patch', 'webpack/hot/dev-server', 'webpack-hot-middleware/client']

  // To load stylesheets outside of
  // the main app entry point, simply uncomment
  // the following lines.
  // const stylesPath = [resolve(__dirname, '../src/assets/app.scss')]

  return {
    entry: {
      app: [
        'babel-polyfill',
        ...IS_DEV ? serverPaths : [],
        ...appPath
      ],
      // styles: [
      //   ...DEV ? serverPaths : [],
      //   ...stylesPath
      // ]
    }
  }
}

const jsModule = () => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        include: [resolve(__dirname, '../src')],
        loader: 'babel-loader',
        query: {
          cacheDirectory: !IS_DEV,
          babelrc: false,
          presets: [
            ['es2015', { modules: false }],
            'es2016',
            'react',
          ],
          plugins: [
            'transform-runtime',
            'transform-object-rest-spread',
            ...!IS_PROD ? ['transform-react-jsx-source', 'transform-react-jsx-self', 'react-hot-loader/babel'] : []
          ],
        }
      }
    ]
  }
})

const assetsModule = () => ({
  module: {
    rules: [
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name]-[hash].[ext]',
          ...IS_PROD ? { publicPath: '../' } : {}
        }
      }
    ]
  }
})

const stylesModule = () => {
  const postcss = {
    loader: 'postcss-loader',
    options: { plugins: [autoprefixer], parser: 'postcss-scss' }
  }

  const css = {
    loader: 'css-loader',
    options: {
      sourceMap: !IS_PROD,
      minimize: IS_PROD
    }
  }

  const style = { loader: 'style-loader' }
  const sass = { loader: 'sass-loader' }

  const loaders = [
    ...!IS_PROD ? [style] : [],
    ...[css],
    ...[sass],
    ...[postcss]
  ]

  const use = IS_PROD ? ExtractTextPlugin.extract({ fallback: 'style-loader', use: loaders }) : loaders

  return {
    module: { rules: [{ test: /\.scss$/, use }] }
  }
}

const output = () => ({
  output: {
    filename: IS_PROD ? '[name].[chunkhash:10].js' : '[name].js',
    path: resolve(__dirname, '../dist'),
    pathinfo: !IS_PROD,
    publicPath: IS_DEV ? `${DEV_SERVER.host}:${DEV_SERVER.port}/` : ''
  }
})

const plugins = () => {
  const production = [
    new ExtractTextPlugin('assets/[name].[contenthash:10].css'),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new ProgressBarPlugin()
  ]

  return {
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => /node_modules/.test(module.resource)
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest', chunks: ['vendor']
      }),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '../src/public/index.html'),
        inject: 'body'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': `'${CURRENT_ENV}'`,
        __DEV__: IS_DEV,
        __PROD__: IS_PROD,
        __TEST__: IS_TEST
      }),
      ...IS_PROD ? production : [],
      ...IS_DEV ? [new webpack.HotModuleReplacementPlugin()] : []
    ]
  }
}

const resolvers = () => ({
  resolve: {
    modules: ['node_modules', resolve(__dirname, '../src')]
  }
})

const other = () => ({
  performance: {
    hints: IS_PROD ? 'warning' : false,
    maxAssetSize: 500000
  },

  bail: IS_PROD,
  cache: !IS_PROD,
  devtool: IS_PROD ? 'source-map' : 'eval',

  stats: {
    colors: true,
    chunkModules: false,
    children: false,
    modules: false,
  }
})

export default merge(
  entry(),
  output(),
  plugins(),
  resolvers(),
  other(),
  jsModule(),
  assetsModule(),
  stylesModule(),
)
