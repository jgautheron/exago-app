export function getAverageLines(data) {
  let out = data.codestats.LOC;
  out += ' / ';
  out += (data.codestats.LOC / data.codestats.NOF).toFixed(0);
  return out;
}

export function getRatioLines(data) {
  return (data.codestats.LOC / data.codestats.NCLOC).toFixed(3);
}

export function getThirdParties(data) {
  if (!data.projectrunner.thirdparties.data) {
    return 0;
  }
  return data.projectrunner.thirdparties.data.length;
}

export function getChecklistCompliance(data) {
  const results = data.projectrunner.goprove.data;
  const checklistTotalItems = results.passed.length + results.failed.length;
  return `${results.passed.length} / ${checklistTotalItems}`;
}

export function getTestsCount(data) {
  return data.codestats.Test;
}

export function getTestCoverage(data) {
  const covMean = data.projectrunner.coverage.data.coverage;
  return `${covMean.toFixed(2)}%`;
}

export function getTestDuration(data) {
  if (!data.projectrunner.test.data) {
    return '';
  }

  const duration = [];
  data.projectrunner.test.data.forEach((pkg) => {
    duration.push(parseFloat(pkg.execution_time));
  });

  let durationMean = 0;
  if (duration.length > 0) {
    duration.forEach((val) => {
      durationMean += val;
    });
    durationMean /= duration.length;
  }

  return `${durationMean.toFixed(3)}s`;
}

export function didTestsPass(data) {
  if (!data.projectrunner.test.data) {
    return false;
  }

  let passed = true;
  data.projectrunner.test.data.forEach((pkg) => {
    if (!pkg.success) {
      passed = false;
    }
  });

  return passed;
}

export function getRank(res) {
  return res.score.rank;
}
