(() => {
  'use strict';
  Polymer({
    is: 'search-input',
    properties: {
      userInput: {
        type: String,
        notify: true,
      },
      target: {
        type: Object,
        value: function() {
          return this.$.searchInput;
        }
      }
    },
    onEnter() {
      if (this.$.searchInput.validate()) {
        this.search();
      }
    },
    search() {
      // only github.com supported for now
      let registry = 'github.com';
      let [username, repository] = this.userInput.split('/');
      page('/project/' + registry + '/' + username + '/' + repository);
    }
  });
})();
