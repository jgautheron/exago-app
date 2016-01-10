(function(document) {
  'use strict';

  let app = document.querySelector('#app');

  // Scroll page to top and expand header
  app.scrollPageToTop = () => document.getElementsByTagName('body')[0].scrollTop = 0;

  app.setMiniHeader = () => document.querySelector('.Header').setAttribute('mini', '');
  app.unsetMiniHeader = () => document.querySelector('.Header').removeAttribute('mini');
})(document);