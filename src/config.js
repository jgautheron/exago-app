require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const desc = 'Go code quality reports';

module.exports = Object.assign({
  protocol: process.env.PROTOCOL || 'http',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiProtocol: process.env.APIPROTOCOL || 'http',
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 8080,
  app: {
    title: 'Exago',
    description: desc,
    head: {
      titleTemplate: 'Exago: %s',
      meta: [
        { name: 'description', content: desc },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Exago.io' },
        { property: 'og:image', content: '/logo.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Code quality reports' },
        { property: 'og:description', content: desc },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@exago.io' },
        { property: 'og:creator', content: '@exago.io' },
        { property: 'og:image:width', content: '120' },
        { property: 'og:image:height', content: '50' }
      ]
    }
  }
}, environment);
