/**
 * Development scripts
 *
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import history from 'connect-history-api-fallback'
import compress from 'compression'

import config, { DEV_SERVER } from './webpack'

const bundle = webpack(config)

browserSync({
  open: DEV_SERVER.autoOpen,
  port: DEV_SERVER.port,
  ui: { port: DEV_SERVER.uiPort },
  server: {
    baseDir: config.output.path,
    middleware: [
      history(),
      compress(),
      webpackDevMiddleware(bundle, {
        publicPath: config.output.publicPath,
        stats: config.stats
      }),
      webpackHotMiddleware(bundle)
    ],
  }
})
