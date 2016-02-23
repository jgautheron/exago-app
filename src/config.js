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
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Exago',
    description: 'code quality tool that inspects your repository and reports on what could be improved',
    head: {
      titleTemplate: 'Exago: %s',
      meta: [
        {name: 'description', content: 'code quality tool that inspects your repository and reports on what could be improved.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Exago.io'},
        {property: 'og:image', content: 'http://lorempixel.com/200/200/'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'React Redux Example'},
        {property: 'og:description', content: 'code quality tool that inspects your repository and reports on what could be improved.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@exago.io'},
        {property: 'og:creator', content: '@exago.io'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  }
}, environment);
