'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"https://zaixianxiche.xyz/api/v1/"'
  // API_URL: '"http://washing.test/api/v1/"'
})
