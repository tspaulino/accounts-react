/**
 * Dist scripts
 *
 * @copyright Copyright (c) 2017, hugw.io
 * @author Hugo W - me@hugw.io
 * @license MIT
 */

/* eslint no-console: "off" */

import webpack from 'webpack'

import config from './webpack'

webpack(config, (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) console.error(err.details)
  } else {
    console.log(stats.toString(config.stats))
  }
})
