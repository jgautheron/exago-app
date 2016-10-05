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

export function getTestResults(data) {
  if (!data.projectrunner.hasOwnProperty('packages') || !Array.isArray(data.projectrunner.packages)) {
    return {
      coverageMean: '',
      durationMean: '',
      testsPassed: false
    };
  }

  // There were tests but we couldn't run them
  if (data.codestats.Test > 0 && data.projectrunner.packages.length === 0) {
    return {
      coverageMean: '',
      durationMean: '',
      testsPassed: false
    };
  }

  let testsPassed = true;
  const cov = [];
  const duration = [];

  data.projectrunner.packages.forEach((pkg) => {
    if (!pkg.success) {
      testsPassed = false;
    }

    if (pkg.hasOwnProperty('coverage')) {
      cov.push(parseFloat(pkg.coverage));
      duration.push(parseFloat(pkg.execution_time));
    }
  });

  let covMean = 0;
  if (cov.length > 0) {
    cov.forEach((val) => {
      covMean += val;
    });
    covMean /= cov.length;
  }

  let durationMean = 0;
  if (duration.length > 0) {
    duration.forEach((val) => {
      durationMean += val;
    });
    durationMean /= duration.length;
  }

  return {
    coverageMean: `${covMean.toFixed(2)} %`,
    durationMean: `${durationMean.toFixed(3)}s`,
    testsPassed
  };
}

export function getRank(res) {
  return res.score.rank;
}
