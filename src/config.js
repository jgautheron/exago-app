require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  protocol: environment.isProduction ? 'https' : 'http',
  host: environment.isProduction ? 'exago.io' : 'localhost',
  port: process.env.PORT,
  apiProtocol: environment.isProduction ? 'https' : 'http',
  apiHost: environment.isProduction ? 'api.exago.io' : 'localhost',
  apiPort: 8080,
  app: {
    title: 'Exago',
    description: 'Code quality tool that inspects your repository and reports on what could be improved',
    head: {
      titleTemplate: 'Exago: %s',
      meta: [
        { name: 'description', content: 'Code quality tool that inspects your repository and reports on what could be improved.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Exago.io' },
        { property: 'og:image', content: 'http://lorempixel.com/200/200/' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Code quality tool' },
        { property: 'og:description', content: 'Code quality tool that inspects your repository and reports on what could be improved.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@exago.io' },
        { property: 'og:creator', content: '@exago.io' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  }
}, environment);
