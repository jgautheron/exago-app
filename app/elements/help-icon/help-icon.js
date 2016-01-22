(() => {
  'use strict';

  Polymer({
    is: 'help-icon',
    properties: {
      text: String,
    },
    ready() {
      this.id = 'tooltip-' + this._generateUniqueID();
    },
    _generateUniqueID() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
  });
})();
