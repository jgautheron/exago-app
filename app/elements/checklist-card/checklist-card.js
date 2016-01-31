(() => {
  'use strict';
  Polymer({
    is: 'checklist-card',
    properties: {
      data: {
        type: Object,
        observer: '_dataChanged'
      }
    },
    behaviors: [Exago.ProjectCardBehavior],
    showDialog() {
      this.$$('paper-dialog').open();
    },
    _dataChanged(data) {
      if (!data || Object.keys(data).length === 0) {
        return;
      }

      let sortedData = {minimumCriteria: [], goodCitizen: [], extraCredit: []}, i, item;
      for (i = 0; item = data.Passed[i++];) {
        sortedData[item.Category].push({
          desc: item.Desc,
          passed: true
        });
      }
      for (i = 0; item = data.Failed[i++];) {
        sortedData[item.Category].push({
          desc: item.Desc,
          passed: false
        });
      }

      this.set('sortedData', sortedData);
    },
    init() {
      this._loading = true;
      this.error = false;
      this.icon = null;
      this.sortedData = null;
    },
  });
})();
