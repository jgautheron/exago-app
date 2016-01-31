(function() {
  'use strict';
  Polymer({
    is: 'exago-app',
    properties: {
      /**
       * Signal to the outside world that this element
       * has been upgraded. Set in ready
       * https://github.com/Polymer/polymer/issues/2653
       */
      upgraded: Boolean
    },
    ready() {
      // Let the world know we're ready to receive data
      // https://github.com/Polymer/polymer/issues/2653
      this.fire('upgraded');
      this.upgraded = true;
    },
    scrollPageToTop() {
      this.$.headerPanelMain.scrollToTop(true);
    },
    // Hide confirmToast after tap on OK button
    onConfirmToastTap() {
      this.$.confirmToast.hide();
    }
  });
})();