export function getAverageLines(data) {
  const codestats = data.projectrunner.golocc.data;
  let out = codestats.loc;
  out += ' / ';
  out += (codestats.loc / codestats.files).toFixed(0);
  return out;
}

export function getRatioLines(data) {
  const codestats = data.projectrunner.golocc.data;
  return ((codestats.cloc / codestats.loc) * 100).toFixed(2);
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
  const codestats = data.projectrunner.golocc.data;
  return codestats.test;
}

export function getTestCoverage(data) {
  const covMean = data.projectrunner.coverage.data.coverage;
  return `${covMean.toFixed(2)}%`;
}

export function getTestDuration(data) {
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
  if (!data.projectrunner.test.data.length) {
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
