export function getAverageLines(data) {
  let out = data.codestats.LOC;
  out += ' / ';
  out += data.codestats.LOC / data.codestats.NOF;
  return out;
}

export function getRatioLines(data) {
  return (data.codestats.LOC / data.codestats.NCLOC).toFixed(3);
}
export function getThirdParties(data) {
  return data.imports.length;
}
export function getChecklistCompliance(data) {
  const results = data.testresults;
  const checklistTotalItems = results.checklist.Passed.length + results.checklist.Failed.length;
  return results.checklist.Passed.length + ' / ' + checklistTotalItems;
}
export function getTestsCount(data) {
  return data.codestats.Test;
}
export function getTestResults(data) {
  let testsPassed = true;
  const cov = [];
  const duration = [];

  data.testresults.packages.forEach((pkg) => {
    if (!pkg.success) {
      testsPassed = false;
      return;
    }

    if (pkg.hasOwnProperty('coverage')) {
      cov.push(parseFloat(pkg.coverage));
      duration.push(parseFloat(pkg.execution_time));
    }
  });

  let covMean = 0;
  if (cov.length > 0) {
    cov.forEach(function incr(val) {
      covMean += val;
    });
    covMean /= cov.length;
  }

  let durationMean = 0;
  if (duration.length > 0) {
    duration.forEach(function incr(val) {
      durationMean += val;
    });
    durationMean /= duration.length;
  }

  return {
    coverageMean: covMean.toFixed(2) + '%',
    durationMean: durationMean.toFixed(3) + 's',
    testsPassed: testsPassed
  };
}
export function getRank(res) {
  return res.score.rank;
}
