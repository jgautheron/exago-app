var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
  config.set({

    browsers: ['PhantomJS'],

    singleRun: true, // !!process.env.CI,

    frameworks: [ 'mocha' ],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'mocha', 'coverage' ],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-mocha-reporter'
    ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.(jpe?g|png|gif|svg|ttf)$/, loader: 'url', query: {limit: 10240} },
          { test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
          { test: /\.json$/, loader: 'json-loader' },
          { test: /\.css$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss' }
        ],
        preLoaders: [
          {
            test: /\.js$/,
            loader: 'isparta',
            include: [path.resolve('src/')],
          }
        ],
        noParse: [
          /node_modules\/sinon\//,
        ]
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js'],
        alias: {
          'sinon': 'sinon/pkg/sinon'
        }
      },
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': 'empty/object',
        'react/lib/ReactContext': 'empty/object',
        'react/addons': 'empty/object'
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
        })
      ]
    },

    webpackServer: {
      noInfo: true
    },

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }

  });
};
