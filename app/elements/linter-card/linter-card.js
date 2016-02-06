(() => {
  'use strict';

  Polymer({
    is: 'linter-card',
    properties: {
      data: {
        type: Object,
        observer: '_dataChanged'
      },
      messages: {
        type: Array,
        notify: true
      },
      linters: Array,
    },
    ready() {
      // all linters are visible by default
      this._visibleLinters = this.linters;
    },
    _dataChanged() {
      this._loading = false;
      this.$.linterResults.style.display = 'block';
      this.messages = this._toArray(this.data);
      this.updateTogglers();
      this.resetFilters();
    },
    updateTogglers() {
      let linters = {}, i;
      for (i in this.messages) {
        linters[this.messages[i].value[0].name] = true;
      }
      let usedLinters = Object.keys(linters);

      let usedLinter, toggle;
      for (i = 0; usedLinter = usedLinters[i++];) {
        toggle = this.$$('#toggle-' + usedLinter);
        if (toggle) {
          toggle.disabled = false;
          toggle.checked = true;
        }
      }

      let linter;
      for (i = 0; linter = this.linters[i++];) {
        if (usedLinters.indexOf(linter) === -1) {
          toggle = this.$$('#toggle-' + linter);
          toggle.disabled = true;
          toggle.checked = false;
        }
      }
    },
    resetFilters() {
      let inputs = this.querySelectorAll('paper-input');
      let i, input;
      for (i = 0; input = inputs[i++];) {
        input.value = '';
      }
    },
    computeFilter(str) {
      if (!str) {
        // set filter to null to disable filtering
        return null;
      } else {
        // return a filter function for the current search string
        str = str.toLowerCase();
        return function(message) {
          var fileName = message.name.toLowerCase();
          return fileName.indexOf(str) !== -1;
        };
      }
    },
    computeLinters() {
      return (linter) => {
        return this._isLinterVisible(linter.name);
      };
    },
    _isLinterVisible(linter) {
      return this._visibleLinters.indexOf(linter) >= 0;
    },
    _toggleLinter(e) {
      let linter = this.$.linters.itemForElement(e.target),
        index = this._visibleLinters.indexOf(linter);

      if (index > -1) {
        this._visibleLinters.splice(index, 1);
      } else {
        this._visibleLinters.push(linter);
      }

      // trigger change event
      this.messages = this._toArray(this.data);
    },
    _hasVisibleLinters(message) {
      let i = message.value.length;
      while (i--) {
        if (this._isLinterVisible(message.value[i].name)) {
          return true;
        }
      }
      return false;
    },
    _showMessages(e) {
      let icon = Polymer.dom(e.target),
        dt = Polymer.dom(icon.parentNode),
        dl = Polymer.dom(dt.parentNode);

      this.toggleClass('collapsed', !dl.classList.contains('collapsed'), dl);
    },
    _toArray(obj) {
      return Object.keys(obj).map((key) => {
        return {
          name: key,
          value: Object.keys(obj[key]).map((k) => {
          return {
            name: k,
            value: obj[key][k]
          };
        })
        };
      });
    }
  });
})();
