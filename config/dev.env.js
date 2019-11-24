var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    baseURL: '"|default|:|http://localhost:8080|,|localhost:10000|:|http://localhost:10000|,|127.0.0.1:8000|:|10.120.140.95:58080|,|192.168.1.111:10000|:|192.168.1.111:10000|"',
    APONURL: '"|default|:|http://localhost:48080/web/apon/home|"',
    MODE: '"dev"'
})
