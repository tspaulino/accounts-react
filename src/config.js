/**
 * Global Configs
 *
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

export const env = process.env.NODE_ENV
export const apiUrl = 'http://localhost:4000'
export const appUrl = 'http://localhost:5000'

/**
 * Meta tags
 */
export const metaTags = {
  title: 'Accounts',
  titleTemplate: '%s - React App',
  defaultTitle: 'Accounts',
  meta: [
    { name: 'description', content: 'A small React app boilerplate.' }
  ]
}
