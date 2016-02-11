(() => {
  'use strict';

  const DEFAULT_LINTERS = [
    'errcheck',
    'gofmt',
    'goimports',
    'golint',
    'deadcode',
    'dupl',
    'gocyclo',
    'ineffassign',
    'varcheck',
    'vet',
    'vetshadow'
  ];

  Polymer({
    is: 'project-info',
    properties: {
      repository: {
        type: String,
        observer: '_repoChanged'
      },
      linters: Array,
      _repoValid: {
        type: Boolean,
        observer: '_repoValidChanged'
      }
    },
    observers: [
      '_rawDataChanged(_rawData.*)',
      '_linterIsLoading(_linterProgress)'
    ],
    ready() {
      if (!this.linters) {
        this.linters = DEFAULT_LINTERS;
      }

      this.app = app;
    },
    requestData() {
      let [registry, username, repository] = this.repository.split('/');
      this._loading = true;

      let urls = [
        '%s/%s/%s/%s/loc',
        '%s/%s/%s/%s/imports',
        '%s/%s/%s/%s/test',
      ];

      let i, url;
      for (i = 0; url = urls[i++];) {
        this.$.query.url = s.sprintf(url, app.SERVICE_HOST, registry, username, repository);
        this.$.query.generateRequest();
      }

      let linter, linterURL = '%s/%s/%s/%s/lint/%s';
      for (i = 0; linter = this.linters[i++];) {
        this.$.query.url = s.sprintf(linterURL, app.SERVICE_HOST, registry, username, repository, linter);
        this.$.query.generateRequest();
      }
    },
    _handleLinterError(e, el) {
      let res = this._getTaskNameFromURL(el.request.url);
      let nodes = this.querySelectorAll('[linter="'+res+'"]');

      let i, node;
      for (i = 0; node = nodes[i++];) {
        node.error = true;
      }

      // display error message
      console.log(el.request.status, el.error);
      this._loading = false;
      //this.error = el.error;
    },
    _handleLinter(e, req) {
      if ('success' !== req.response.status) {
        // handle the error
        return;
      }

      let rsp = req.response.data;
      let responseURL = this._parseURL(req.url);
      let [,,,, res] = responseURL.pathname.split('/');

      this['_setUp' + res[0].toUpperCase() + res.slice(1)](rsp, responseURL);
    },
    _setUpLoc(data) {
      if (!Object.keys(data).length) {
        return;
      }

      this.set('_rawData.loc', data);
      this.set('_data.loc', {
        totalAvgLoc: data.LOC.toFixed(0)  + ' / ' +  (data.LOC / data.NOF).toFixed(0),
        ratioLocCloc: ((data.LOC / data.NCLOC)).toFixed(3),
        tests: data.Test
      });
    },
    _setUpImports(data) {
      this.set('_rawData.imports', data);
      this.set('_data.imports', {
        thirdPartiesCount: data.length
      });
    },
    _setUpLint(data) {
      // increment the progress bar for each linter loaded
      this._linterProgress += 1;

      // merge each time the data into linterResults
      // identify the last call and then inject the results in linterCard
      if (Object.keys(data).length) {
        this.linterResults = blend(true, false, this.linterResults, data);
      }

      if (this._linterIsLoading()) {
        return;
      }

      let disabled = false, raised = true,
        html = 'Explore <iron-icon icon="chevron-right"></iron-icon>';

      // no linter result, then there's nothing to show
      if (Object.keys(this.linterResults).length === 0) {
        disabled = true;
        raised = false;
        html = 'Awesome! all linters passed <iron-icon icon="check"></iron-icon>';
      }

      // rawData is used for internal -unfiltered- processing
      this.set('_rawData.linter', this.linterResults);

      // update the view
      this.$$('linter-card').data = this.linterResults;

      // propagate the linter results so that they can be caught
      // asynchronously in some other element
      this.fire('iron-signal', {name: 'lint', data: this.linterResults});

      this.$$('paper-button.explore div').innerHTML = html;
      this.$$('paper-button.explore paper-progress').style.display = 'none';
      this.$$('paper-button.explore').disabled = disabled;
      this.$$('paper-button.explore').raised = raised;
    },
    _setUpTest(data) {
      let testPassed = true, cov = [], duration = [];

      data.packages.forEach((pkg) => {
        if (!pkg.success) {
          testPassed = false;
          return;
        }

        if (pkg.hasOwnProperty('coverage')) {
          cov.push(parseFloat(pkg.coverage));
          duration.push(parseFloat(pkg.execution_time));
        }
      });

      let covMean = 0;
      if (cov.length > 0) {
        cov.forEach(function(v) {
          covMean += v;
        });
        covMean /= cov.length;
      }

      let durationMean = 0;
      if (duration.length > 0) {
        duration.forEach(function(v) {
          durationMean += v;
        });
        durationMean /= duration.length;
      }

      let checklistTotalItems = data.checklist.Passed.length + data.checklist.Failed.length;
      this.set('_data.test', {
        checklist: data.checklist.Passed.length + ' / ' + checklistTotalItems,
        coverageMean: covMean.toFixed(2) + '%',
        durationMean: durationMean.toFixed(3) + 's',
        testPassed: testPassed
      });
      this.set('_rawData.test', data);
    },
    _handleRank(e, req) {
      if ('success' !== req.response.status) {
        // handle the error
        return;
      }

      let rsp = req.response.data;
      this.set('_data.rank', rsp.score.rank);
    },
    _loadRank() {
      let [registry, username, repository] = this.repository.split('/'),
        rankURL = '%s/%s/%s/%s/rank';
      this.$.rank.url = s.sprintf(rankURL, app.SERVICE_HOST, registry, username, repository);
      this.$.rank.generateRequest();
    },
    _linterIsLoading(progress) {
      // observers are called before ready()
      if (this.linters) {
        return this._linterProgress !== this.linters.length;
      }
      return true;
    },
    _rawDataChanged(val) {
      if (val.base.hasOwnProperty('imports') &&
        val.base.hasOwnProperty('loc') &&
        val.base.hasOwnProperty('test') &&
        val.base.hasOwnProperty('linter')) {
        this._loadRank();
      }

      if (val.base.hasOwnProperty('loc') &&
        val.base.hasOwnProperty('test')) {
        if (val.base.loc.tests > 0) {
          this.set('_testsIcon', val.base.test.testPassed ? 'check' : 'clear');
        }
      }
    },
    _repoValidChanged(val) {
      if (!!val) {
        this.requestData();
      }
    },
    // Reinitialise the page state.
    _repoChanged() {
      this._loading = true;
      this._repoValid = false;
      this._data = {};
      this._rawData = {};
      this._linterProgress = 0;
      this.linterResults = {};

      let exploreBtn = this.$$('paper-button.explore');
      if (exploreBtn) {
        this.$$('paper-button.explore div').innerHTML = 'Loading';
        exploreBtn.disabled = true;
        exploreBtn.style.display = 'block';

        // reinitialise the progress bar
        this._linterProgress = 0;
        this.$$('paper-button.explore paper-progress').style.display = 'block';
      }

      let linterCard = this.$$('linter-card');
      if (linterCard) {
        linterCard.style.display = 'none';
      }

      // reinitialise cards state
      let cards = this.querySelectorAll('[linter]'), card, i;
      if (cards) {
        for (i = 0; card = cards[i++];) {
          card.init();
        }
      }

      this._checkRepoValid();
    },
    _handleRepoValid(e, el) {
      this._repoValid = !el.hasOwnProperty('error') && 'success' === el.response.status;
      this._loading = false;
      if (!this._repoValid) {
        if (el.request.xhr.response && el.request.xhr.response.hasOwnProperty('message')) {
          let msg = el.request.xhr.response.message;
          if (typeof msg === 'object') {
            if (el.request.xhr.status === 404) {
              this._errorMessage = 'The repository couldn\'t be found.';
            } else {
              this._errorMessage = 'Something went wrong';
            }
          } else {
            this._errorMessage = el.request.xhr.response.message;
          }
        } else {
          this._errorMessage = 'Something went wrong';
        }
      }
    },
    _checkRepoValid() {
      this.$.queryRepoValid.url = s.sprintf('%s/%s/valid', app.SERVICE_HOST, this.repository);
      this.$.queryRepoValid.generateRequest();
    },
    _showResults() {
      this.$$('paper-button.explore').style.display = 'none';
      this.$$('linter-card').style.display = 'block';
    },
    _getTaskNameFromURL(url) {
      let responseURL = this._parseURL(url);
      let [,,,, res] = responseURL.pathname.split('/');
      return res;
    },
    _parseURL(href) {
      var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
      return match && {
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
      };
    }
  });
})();
