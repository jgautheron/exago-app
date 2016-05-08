import React from 'react';
import ActionCheckCircle from 'material-ui/lib/svg-icons/action/check-circle';
import AlertError from 'material-ui/lib/svg-icons/alert/error';

export function getThirdParties(data) {
  if (data.imports.length === 0) {
    return '';
  }

  return (
    <div>
    {data.imports.map(el =>
      <span>{el}</span>
    )}
    </div>
  );
}

export function getChecklist(data) {
  const res = data.testresults.checklist;
  const sortedData = {minimumCriteria: [], goodCitizen: [], extraCredit: []};

  let cnt;
  let item;
  for (cnt = 0; item = res.Passed[cnt++];) {
    sortedData[item.Category].push({
      desc: item.Desc,
      passed: true
    });
  }
  for (cnt = 0; item = res.Failed[cnt++];) {
    sortedData[item.Category].push({
      desc: item.Desc,
      passed: false
    });
  }
  const styles = {
    icon: {
      paddingRight: 6,
      position: 'relative',
      top: 5
    }
  };

  return (
    <div>
      <h4>Minimum Criteria</h4>
      {sortedData.minimumCriteria.map(el =>
        <div>
          {el.passed ? <ActionCheckCircle style={styles.icon} /> : <AlertError style={styles.icon} />}
          {el.desc}
        </div>
      )}

      <h4>Good Citizen</h4>
      {sortedData.goodCitizen.map(el =>
        <div>
          {el.passed ? <ActionCheckCircle style={styles.icon} /> : <AlertError style={styles.icon} />}
          {el.desc}
        </div>
      )}

      <h4>Extra Credit</h4>
      {sortedData.extraCredit.map(el =>
        <div>
          {el.passed ? <ActionCheckCircle style={styles.icon} /> : <AlertError style={styles.icon} />}
          {el.desc}
        </div>
      )}
    </div>
  );
}
