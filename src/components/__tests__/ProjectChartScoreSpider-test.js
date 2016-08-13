import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ProjectChartScoreSpider from '../ProjectChartScoreSpider/ProjectChartScoreSpider';

describe('ProjectChartScoreSpider', () => {
  const mock = {
    score: {
      value: 78.30973895505747,
      rank: 'C',
      details: [
        {
          name: 'thirdparties',
          score: 78.67383488639031,
          weight: 1.5,
          desc: 'counts the number of third party libraries',
          msg: '3 third-party package(s)',
          url: 'https://github.com/jgautheron/gogetimports'
        },
        {
          name: 'codestats',
          score: 6.018818710673128,
          weight: 1,
          desc: 'counts lines of code, comments, functions, structs, imports etc in Go code',
          msg: '258 comments for 1816 lines of code',
          url: 'https://github.com/jgautheron/golocc'
        },
        {
          name: 'testcoverage',
          score: 75.90690062458441,
          weight: 3.2591158441850663,
          desc: 'measures pourcentage of code covered by tests',
          msg: 'coverage is greater or equal to 60.45',
          url: 'https://golang.org/pkg/testing/'
        },
        {
          name: 'testduration',
          score: 96.24150961289223,
          weight: 1.2,
          desc: 'measures time taken for testing',
          msg: 'tests took 1.41s',
          url: 'https://golang.org/pkg/testing/'
        },
        {
          name: 'checklist',
          score: 92.3913043478261,
          weight: 1.8,
          desc: 'inspects project for the best practices listed in the Go CheckList',
          msg: 0,
          url: 'https://github.com/karolgorecki/goprove',
          details: [
            {
              name: 'hasReadme',
              score: 100,
              weight: 3,
              msg: 'check succeeded',
              url: 'https://github.com/matttproud/gochecklist/blob/master/publication/documentation_entrypoint.md'
            },
            {
              name: 'isDirMatch',
              score: 0,
              weight: 0.7,
              msg: 'check failed',
              url: 'https://github.com/matttproud/gochecklist/blob/master/publication/dir_pkg_match.md'
            },
            {
              name: 'isLinted',
              score: 100,
              weight: 0.5,
              msg: 'check succeeded',
              url: 'https://github.com/matttproud/gochecklist/blob/master/publication/code_correctness.md'
            },
            {
              name: 'hasBenches',
              score: 100,
              weight: 0.5,
              msg: 'check succeeded'
            },
            {
              name: 'projectBuilds',
              score: 100,
              weight: 1.5,
              msg: 'check succeeded',
              url: 'https://github.com/matttproud/gochecklist/blob/master/publication/compilation.md'
            },
            {
              name: 'isFormatted',
              score: 100,
              weight: 3,
              msg: 'check succeeded',
              url: 'https://github.com/matttproud/gochecklist/blob/master/publication/code_correctness.md'
            }
          ]
        },
        {
          name: 'lintmessages',
          score: 94.66522011748738,
          weight: 2,
          desc: 'runs a whole bunch of Go linters',
          msg: 0,
          url: 'https://github.com/alecthomas/gometalinter',
          details: [
            {
              name: 'ineffassign',
              score: 96.75001997898423,
              weight: 1,
              desc: 'detects ineffective assignments in Go code',
              msg: 'exceeds the warnings/LOC threshold',
              url: 'https://github.com/gordonklaus/ineffassign'
            },
            {
              name: 'goimports',
              score: 96.75001997898423,
              weight: 2,
              desc: 'finds missing imports',
              msg: 'exceeds the warnings/LOC threshold',
              url: 'https://golang.org/x/tools/cmd/goimports'
            },
            {
              name: 'deadcode',
              score: 92.58042025599056,
              weight: 3,
              desc: 'checks for syntactically unreachable Go code',
              msg: 'exceeds the warnings/LOC threshold',
              url: 'https://golang.org/src/cmd/vet/deadcode.go'
            }
          ]
        }
      ]
    }
  };

  const chartScoreSpider = shallow(<ProjectChartScoreSpider data={mock} />);

  it('should render correctly', () => {
    expect(chartScoreSpider).toExist();
  });

  it('should pass config to chart', () => {
    const chartProps = chartScoreSpider.find('CardMedia').children().props();

    expect(chartProps.config).toExist();
    expect(chartProps.config.series.length, 1);
    expect(chartProps.config.series[0].data.length)
      .toEqual(mock.score.details.length);
  });
});
