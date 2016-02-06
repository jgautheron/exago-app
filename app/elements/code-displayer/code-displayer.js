(() => {
  'use strict';

  Polymer({
    is: 'code-displayer',
    properties: {
      repository: {
        type: String,
        notify: true
      },
      language: String,
      path: {
        type: String,
        notify: true
      },
      messages: {
        type: Array,
        value: []
      },
      _loading: {
        type: Boolean,
        notify: true,
        observer: '_loadingChanged'
      },
      _files: Object,
      animationConfig: {
        type: Object,
        value: function() {
          return {
            'show-code': [
              {
                name: 'fade-in-animation',
                node: this.$.codeMirror,
                timing: {duration: 500}
              }
            ]
          };
        }
      }
    },
    behaviors: [Polymer.NeonAnimationRunnerBehavior],
    listeners: {
      'neon-animation-finish': '_onNeonAnimationFinish'
    },
    ready() {
      this.$.codeMirror.style.opacity = 0;
      this.showContent();
    },
    showContent() {
      if (!this.path && !this.repository) {
        return;
      }

      if (this._files && this._files.hasOwnProperty(this.path)) {
        this.content = this._files[this.path];
        this.playAnimation('show-code');
      } else {
        this.requestFile();
      }
    },
    requestFile() {
      this._error = false;
      this._loading = true;
      this.$.codeRequest.url = s.sprintf('%s/%s/contents/%s', app.SERVICE_HOST, this.repository, this.path);
      this.$.codeRequest.generateRequest();
    },
    handleError(e, req) {
      // display error message
      console.log(req.request.status, req.error);
      this._loading = false;
      this._error = req.error;
    },
    handleResponse(e, req) {
      this._loading = false;

      if (req.response.status !== 'success') {
        // handle error! toast notification?
        return;
      }

      this.content = req.response.data;

      let files = {};
      files[this.path] = this.content;
      this._files = blend(true, false, this._files, files);

      let results;
      let retry = setInterval(() => {
        results = this.$.meta.byKey('linterResults');
        if (results) {
          clearInterval(retry);
          if (results.hasOwnProperty(this.path)) {
            this._setLineWidgets(results[this.path]);
          }
        }
      }, 50);

      this.playAnimation('show-code');
    },
    _setLineWidgets(linterResults) {
      let linter, message, i;
      for (linter in linterResults) {
        for (i = 0; message = linterResults[linter][i++];) {
          let row = document.createElement('div');
          row.id = 'linterMessage' + i;
          row.className = 'linter-message';
          row.innerHTML = '<iron-icon icon="warning"></iron-icon>';
          row.innerHTML += linter + ': ' + message.message;

          this.$.codeMirror.getMirror().addLineWidget(message.line - 1, row, {coverGutter: true, above: true});
        }
      }

      if (document.location.hash) {
        let line = document.location.hash.replace('#', '');
        line = parseInt(line) - 1;
        this._scrollToLine(line);
      }
    },
    _scrollToLine(line) {
      line -= 1;
      let lines = document.querySelectorAll('.CodeMirror-linenumber');
      if (!lines[line]) {
        return;
      }

      let rect = lines[line].getBoundingClientRect();
      // 64 corresponds to the header panel height
      app.scrollPageTo(rect.top - 64);
    },
    _loadingChanged(val) {
      this.$.codeLoading.active = val;
    },
    _lintSignal(e, linterResults) {
      if (linterResults.hasOwnProperty(this.path)) {
        this._setLineWidgets(linterResults[this.path]);
      }
    },
    _onNeonAnimationFinish() {
      if (!this._loading) {
        this.$.codeMirror.style.opacity = 1;
      }
    }
  });
})();
