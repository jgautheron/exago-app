module.exports = {
  // Autoprefixer
  autoprefixer: {
    // https://github.com/postcss/autoprefixer#browsers
    browsers: [
      // Setup for WebComponents Browser Support
      // https://github.com/WebComponents/webcomponentsjs#browser-support
      'Explorer >= 10',
      'ExplorerMobile >= 10',
      'Firefox >= 30',
      'Chrome >= 34',
      'Safari >= 7',
      'Opera >= 23',
      'iOS >= 7',
      'Android >= 4.4',
      'BlackBerry >= 10'
    ]
  },
  // BrowserSync
  browserSync: {
    browser: 'default', // or ["google chrome", "firefox"]
    https: false, // Enable https for localhost development.
    notify: false, // The small pop-over notifications in the browser.
    port: 3000,
    ui: {
      port: 3001
    }
  },
  // Polymer Theme
  // Set theme also in file app/elements/elements.html
  // <link rel="import" href="../themes/default-theme/theme.html">
  theme: 'default-theme'
};
