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

  const SERVICE_HOST = 'http://exago.io:8080';

  Polymer({
    is: 'project-info',
    properties: {
      repository: {
        type: String,
        observer: '_repoChanged'
      },
      linters: Array,
      _repoExists: {
        type: Boolean,
        observer: '_repoExistsChanged'
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
        this.$.query.url = s.sprintf(url, SERVICE_HOST, registry, username, repository);
        this.$.query.generateRequest();
      }

      let linter, linterURL = '%s/%s/%s/%s/lint/%s';
      for (i = 0; linter = this.linters[i++];) {
        this.$.query.url = s.sprintf(linterURL, SERVICE_HOST, registry, username, repository, linter);
        this.$.query.generateRequest();
      }
    },
    _handleLinterError(e, el) {
      let res = this._getTaskNameFromURL(el.request.url);
      let nodes = this.querySelectorAll('project-card[linter="'+res+'"]');

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

      let data = req.response.data;
      let responseURL = this._parseURL(req.url);
      let [,,,, res] = responseURL.pathname.split('/');

      this['_setUp' + res[0].toUpperCase() + res.slice(1)](data, responseURL);
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

      let disabled = false, raised = true, html = 'Explore';

      // no linter result, then there's nothing to show
      if (Object.keys(this.linterResults).length === 0) {
        disabled = true;
        raised = false;
        html = 'Awesome! all linters passed <iron-icon icon="check"></iron-icon>';
      }

      this.set('_rawData.linter', this.linterResults);
      this.$$('linter-card').data = this.linterResults;

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
    _getAppScore() {
      let score = 0;

      // third parties
      switch (true) {
        case this._rawData.imports.length === 0:
          score += 20;
          break;
        case this._rawData.imports.length<4:
          score += 15;
          break;
        case this._rawData.imports.length<6:
          score += 10;
          break;
      }

      // ratio loc/cloc
      switch (true) {
        case this._data.loc.ratioLocCloc>1.4:
          score += 12;
          break;
        case this._data.loc.ratioLocCloc>1.3:
          score += 10;
          break;
        case this._data.loc.ratioLocCloc>1.2:
          score += 8;
          break;
        case this._data.loc.ratioLocCloc>1.1:
          score += 6;
          break;
      }

      // checklist
      let i, passed, failed;
      for (i = 0; passed = this._rawData.test.checklist.Passed[i++];) {
        switch (passed.Name) {
          case 'projectBuilds':
          case 'isFormatted':
            score += 10;
            break;
          case 'hasReadme':
          case 'isDirMatch':
            score += 10;
            break;
          case 'isLinted':
          case 'hasBenches':
            score += 15;
            break;
        }
      }
      for (i = 0; failed = this._rawData.test.checklist.Failed[i++];) {
        switch (failed.Name) {
          case 'projectBuilds':
          case 'isFormatted':
            score -= 20;
            break;
          case 'isLinted':
          case 'hasReadme':
          case 'isDirMatch':
            score -= 10;
            break;
        }
      }

      // test coverage
      switch (true) {
        case parseFloat(this._data.test.coverageMean) > 80:
          score += 20;
          break;
        case parseFloat(this._data.test.coverageMean) > 60:
          score += 15;
          break;
        case parseFloat(this._data.test.coverageMean) > 40:
          score += 10;
          break;
        case parseFloat(this._data.test.coverageMean) === 0:
          score -= 20;
          break;
      }

      // test execution time
      switch (true) {
        case parseFloat(this._data.test.durationMean) > 10:
          score -= 15;
          break;
        case parseFloat(this._data.test.coverageMean) > 5:
          score += 10;
          break;
      }

      // linter results
      if (Object.keys(this.linterResults).length === 0) {
        // this feat is more impressive on large codebases
        score += (this._rawData.loc.LOC * 0.02);
      }

      switch (true) {
        case score >= 80:
          score = 'A';
          break;
        case score >= 60:
          score = 'B';
          break;
        case score >= 40:
          score = 'C';
          break;
        case score >= 20:
          score = 'D';
          break;
        case score >= 0:
          score = 'E';
          break;
        default:
          score = 'F';
      }

      return score;
    },
    _linterIsLoading(progress) {
      return this._linterProgress !== this.linters.length;
    },
    _rawDataChanged(val) {
      if (val.base.hasOwnProperty('imports') &&
        val.base.hasOwnProperty('loc') &&
        val.base.hasOwnProperty('test') &&
        val.base.hasOwnProperty('linter')) {
        this.set('_data.rating', this._getAppScore());
      }

      if (val.base.hasOwnProperty('loc') &&
        val.base.hasOwnProperty('test')) {
        this.set('_testsIcon', this._data.test.testPassed ? 'check' : 'clear');
        this.set('_testsIconTooltip', 'The tests didn\'t pass');
      }
    },
    _repoExistsChanged(val) {
      if (!!val) {
        this.requestData();
      }
    },
    _repoChanged() {
      this._loading = true;
      this._repoExists = false;
      this._data = {};
      this._rawData = {};
      this._linterProgress = 0;
      this.linterResults = {};
      this.$$('paper-button.explore').disabled = true;
      this.$$('paper-button.explore').style.display = 'block';
      this.$$('linter-card').style.display = 'none';

      // reinitialise cards state
      let cards = this.querySelectorAll('project-card'), card, i;
      for (i = 0; card = cards[i++];) {
        card.showLoader();
      }

      this._checkRepoExists();
    },
    _handleRepoExists(e, el) {
      this._repoExists = !el.hasOwnProperty('error') && 'success' === el.response.status;
      this._loading = false;
      if (!this._repoExists) {
        this._errorMessage = el.request.xhr.response.message;
      }
    },
    _checkRepoExists() {
      this.$.queryRepoExists.url = s.sprintf('%s/%s/valid', SERVICE_HOST, this.repository);
      this.$.queryRepoExists.generateRequest();
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
