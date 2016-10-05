import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ProjectCardList from '../ProjectCardList/ProjectCardList';
import { getTestCoverage, getThirdParties } from '../ProjectCardList/dataFormatter';
import * as popoverHtml from '../ProjectCardList/popoverHtml';
import { withTheme } from './WithTheme';

const dataMock = {
  data: {
    codestats: {
      Assertion: 0,
      CLOC: 35,
      ExportedFunction: 1,
      ExportedMethod: 2,
      Function: 5,
      FunctionLOC: 112,
      GoStatement: 0,
      IfStatement: 34,
      Import: 19,
      Interface: 0,
      LOC: 342,
      Method: 6,
      MethodLOC: 168,
      NCLOC: 307,
      NOF: 3,
      Struct: 5,
      SwitchStatement: 1,
      Test: 0
    },
    projectrunner: {
      coverage: {
        label: 'Code Coverage',
        data: {
          packages: [],
          coverage: 0
        },
        raw_output: '',
        execution_time: 0,
        error: null
      },
      download: {
        label: 'Go Get',
        data: null,
        raw_output: '',
        execution_time: 6939199169,
        error: null
      },
      goprove: {
        label: 'Go Prove',
        data: {
          failed: [
            {
              category: 'minimumCriteria',
              desc: "README Presence: Does the project's include a documentation entrypoint?",
              name: 'hasReadme'
            },
            {
              category: 'goodCitizen',
              desc: 'Contribution Process: Does the project document a contribution process?',
              name: 'hasContributing'
            },
            {
              category: 'minimumCriteria',
              desc: 'Licensed: Does the project have a license?',
              name: 'hasLicense'
            },
            {
              category: 'minimumCriteria',
              desc: 'Compiles: Does the project build?',
              name: 'projectBuilds'
            },
            {
              category: 'minimumCriteria',
              desc: 'go tool vet Correctness: Is the Go vet satisfied?',
              name: 'isVetted'
            },
            {
              category: 'minimumCriteria',
              desc: 'Directory Names and Packages Match',
              name: 'isDirMatch'
            },
            {
              category: 'minimumCriteria',
              desc: 'gofmt Correctness: Is the code formatted correctly?',
              name: 'isFormatted'
            }
          ],
          passed: [
            {
              category: 'minimumCriteria',
              desc: 'golint Correctness: Is the linter satisfied?',
              name: 'isLinted'
            },
            {
              category: 'extraCredit',
              desc: 'Blackbox Tests: In addition to standard tests, does the project have blackbox tests?',
              name: 'hasBlackboxTests'
            },
            {
              category: 'extraCredit',
              desc: 'Benchmarks: In addition to tests, does the project have benchmarks?',
              name: 'hasBenches'
            }
          ]
        },
        raw_output: '',
        execution_time: 9228815606,
        error: null
      },
      test: {
        label: 'Go Test',
        data: [],
        raw_output: '?   \tgithub.com/jgautheron/goconst\t[no test files]\n',
        execution_time: 1143001562,
        error: null
      },
      thirdparties: {
        label: 'Go List (finds all 3rd parties)',
        data: [],
        raw_output: '',
        execution_time: 883241335,
        error: null
      }
    },
    lintmessages: {
      'cmd/goconst/main.go': {
        gocyclo: [
          {
            col: 0,
            line: 88,
            message: 'cyclomatic complexity 16 of function printOutput() is high (> 10)',
            severity: 'warning'
          }
        ],
        vet: [
          {
            col: 0,
            line: 55,
            message: 'arg usage in Fprint call is a function value, not a function call',
            severity: 'error'
          }
        ]
      },
      'parser.go': {
        errcheck: [
          {
            col: 16,
            line: 65,
            message: 'error return value not checked (filepath.Walk(p.path[:pathLen-3], ' +
                     'func(path string, f os.FileInfo, err error) error {)',
            severity: 'warning'
          },
          {
            col: 15,
            line: 73,
            message: 'error return value not checked (p.parseDir(path))',
            severity: 'warning'
          },
          {
            col: 13,
            line: 78,
            message: 'error return value not checked (p.parseDir(p.path))',
            severity: 'warning'
          }
        ],
        golint: [
          {
            col: 6,
            line: 24,
            message: 'exported type Parser should have comment or be unexported',
            severity: 'warning'
          },
          {
            col: 6,
            line: 125,
            message: 'exported type Strings should have comment or be unexported',
            severity: 'warning'
          },
          {
            col: 6,
            line: 126,
            message: 'exported type Constants should have comment or be unexported',
            severity: 'warning'
          },
          {
            col: 6,
            line: 128,
            message: 'exported type ConstType should have comment or be unexported',
            severity: 'warning'
          },
          {
            col: 6,
            line: 133,
            message: 'exported type ExtendedPos should have comment or be unexported',
            severity: 'warning'
          }
        ]
      },
      'visitor.go': {
        gocyclo: [
          {
            col: 0,
            line: 21,
            message: 'cyclomatic complexity 28 of function (*treeVisitor).Visit() is high (> 10)',
            severity: 'warning'
          }
        ]
      }
    },
    metadata: {
      image: 'https://avatars.githubusercontent.com/u/683888?v=3',
      description: 'Find in Go repeated strings that could be replaced by a constant',
      stars: 60,
      last_push: '2016-05-14T19:25:25Z'
    },
    score: {
      value: 46.83003447187171,
      rank: 'F',
      details: [
        {
          name: 'imports',
          score: 100,
          weight: 1.5,
          desc: 'counts the number of third party libraries',
          msg: '0 third-party package(s)',
          url: 'https://github.com/jgautheron/gogetimports'
        },
        {
          name: 'codestats',
          score: 3.6801869312205877,
          weight: 1,
          desc: 'counts lines of code, comments, functions, structs, imports etc in Go code',
          msg: '35 comments for 342 lines of code',
          url: 'https://github.com/jgautheron/golocc'
        },
        {
          name: 'testduration',
          score: 0,
          weight: 1.2,
          desc: 'measures time taken for testing',
          msg: 'no tests',
          url: 'https://golang.org/pkg/testing/'
        },
        {
          name: 'checklist',
          score: 94.56521739130436,
          weight: 1.8,
          desc: 'inspects project for the best practices listed in the Go CheckList',
          msg: '',
          url: 'https://github.com/karolgorecki/goprove',
          details: [
            {
              name: 'isLinted',
              score: 100,
              weight: 0.5,
              msg: 'check succeeded',
              url: 'https://github.com/matttproud/gochecklist/blob/master/publication/code_correctness.md'
            },
            {
              name: 'hasBenches',
              score: 0,
              weight: 0.5,
              msg: 'check failed'
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
            },
            {
              name: 'hasReadme',
              score: 100,
              weight: 3,
              msg: 'check succeeded',
              url: 'https://github.com/matttproud/gochecklist/blob/master/publication/documentation_entrypoint.md'
            },
            {
              name: 'isDirMatch',
              score: 100,
              weight: 0.7,
              msg: 'check succeeded',
              url: 'https://github.com/matttproud/gochecklist/blob/master/publication/dir_pkg_match.md'
            }
          ]
        },
        {
          name: 'testcoverage',
          score: 0,
          weight: 3,
          desc: 'measures pourcentage of code covered by tests',
          msg: 'no tests',
          url: 'https://golang.org/pkg/testing/'
        },
        {
          name: 'lintmessages',
          score: 83.9088918595423,
          weight: 2,
          desc: 'runs a whole bunch of Go linters',
          msg: '',
          url: 'https://github.com/alecthomas/gometalinter',
          details: [
            {
              name: 'errcheck',
              score: 83.9088918595423,
              weight: 2,
              desc: 'finds unchecked errors in Go code',
              msg: 'exceeds the warnings/LOC threshold',
              url: 'https://github.com/kisielk/errcheck'
            }
          ]
        }
      ]
    },
    execution_time: '8s',
    last_update: '2016-07-14T23:26:41.188233588+02:00'
  },
  status: 'success'
};

describe('ProjectCardList', () => {
  const pcl = shallow(<ProjectCardList data={dataMock.data} />);
  pcl.setProps({ data: dataMock.data });

  it('should render correctly', () => {
    return expect(pcl).toExist();
  });

  const cards = pcl.find('div > div');

  it('should render 8 ProjectCards', () => {
    return expect(cards.length).toBe(8);
  });

  it('ProjectCards should have correct title & value', () => {
    expect(cards.at(0).children().props().value).toBe('342 / 114');
    expect(cards.at(2).children().props().value).toBe(0);
  });

  it('should prepareData when will receive props', () => {
    expect(pcl.instance().props.data.projectrunner.test.raw_output).toNotBe('');

    dataMock.data.projectrunner.test.raw_output = '';
    dataMock.data.codestats.Test = 1;

    pcl.setProps(dataMock);
    expect(pcl.instance().props.data.projectrunner.test.raw_output).toBe('');
  });

  describe('getThirdParties (dataFormatter)', () => {
    it('should return 0 when third parties do not exist', () => {
      expect(getThirdParties({ projectrunner: { thirdparties: { data: [] } } })).toEqual(0);
    });
  });

  describe('getTestCoverage', () => {
    it('returns no results when no package was tested', () => {
      expect(getTestCoverage({
        projectrunner: {
          coverage: {
            data: {
              packages: [],
              coverage: 0
            }
          }
        }
      })).toEqual('0.00%');
    });
    it('returns mean coverage', () => {
      expect(getTestCoverage({
        projectrunner: {
          coverage: {
            data: {
              coverage: 10,
            }
          }
        },
      })).toEqual('10.00%');
    });
  });

  describe('popoverHtml', () => {
    describe('getScoreDetails', () => {
      it('should return empty when no score data is there', () => {
        expect(popoverHtml.getScoreDetails({ score: {} })).toEqual('');
      });
    });

    describe('getChecklist', () => {
      it('should show the checklist', () => {
        const mock = {
          projectrunner: {
            goprove: {
              data: {
                failed: [
                  { category: 'extraCredit', desc: 'fooDescription', name: 'fooName' },
                  { category: 'goodCitizen', desc: 'barDescription', name: 'barName' },
                  { category: 'minimumCriteria', desc: 'mooDescription', name: 'mooName' }
                ],
                passed: [
                  { category: 'extraCredit', desc: 'fooDescriptionOK', name: 'fooNameOK' },
                  { category: 'goodCitizen', desc: 'barDescriptionOK', name: 'barNameOK' },
                  { category: 'minimumCriteria', desc: 'mooDescriptionOK', name: 'mooNameOK' }
                ]
              }
            }
          }
        };

        const passed = mock.projectrunner.goprove.data.passed;
        const failed = mock.projectrunner.goprove.data.failed;

        const checklist = shallow(withTheme(popoverHtml.getChecklist(mock)));
        const cols = checklist.find('TableRowColumn');

        expect(cols.at(0).children().node).toEqual(passed[2].desc);
        expect(cols.at(1).children().text()).toEqual('<ActionCheckCircle />');
        expect(cols.at(2).children().node).toEqual(failed[2].desc);
        expect(cols.at(3).children().text()).toEqual('<AlertError />');

        expect(cols.at(4).children().node).toEqual(passed[1].desc);
        expect(cols.at(5).children().text()).toEqual('<ActionCheckCircle />');
        expect(cols.at(6).children().node).toEqual(failed[1].desc);
        expect(cols.at(7).children().text()).toEqual('<AlertError />');

        expect(cols.at(8).children().node).toEqual(passed[0].desc);
        expect(cols.at(9).children().text()).toEqual('<ActionCheckCircle />');
        expect(cols.at(10).children().node).toEqual(failed[0].desc);
        expect(cols.at(11).children().text()).toEqual('<AlertError />');
      });
    });

    describe('getTestCoverage', () => {
      it('should return empty when no packages data is there', () => {
        expect(popoverHtml.getTestCoverage({
          projectrunner: {
            coverage: {
              data: {
                packages: [],
              },
            }
          }
        })).toEqual('');
      });

      it('should show coverage info', () => {
        const mock = {
          projectrunner: {
            coverage: {
              data: {
                packages: [
                  { name: 'foo', coverage: 10 },
                  { name: 'bar', coverage: 20 },
                  { name: 'moo', coverage: 100 }
                ]
              }
            }
          }
        };
        const { projectrunner: { coverage: { data: { packages: pkgs } } } } = mock;
        const testCoverage = shallow(withTheme(popoverHtml.getTestCoverage(mock)));
        const cols = testCoverage.find('TableRowColumn');

        expect(cols.at(0).children().text()).toEqual(pkgs[0].name);
        expect(cols.at(1).children().node).toEqual(pkgs[0].coverage);

        expect(cols.at(2).children().text()).toEqual(pkgs[1].name);
        expect(cols.at(3).children().node).toEqual(pkgs[1].coverage);

        expect(cols.at(4).children().text()).toEqual(pkgs[2].name);
        expect(cols.at(5).children().node).toEqual(pkgs[2].coverage);
      });
    });

    describe('getThirdParties', () => {
      it('should return empty when no imports data is there', () => {
        expect(popoverHtml.getThirdParties({ projectrunner: { thirdparties: { data: [] } } })).toEqual('');
      });

      it('should render ProjectThirdParties', () => {
        const mock = { projectrunner: { thirdparties: { data: ['foo', 'bar', 'moo'] } } };
        const thirdParties = shallow(withTheme(popoverHtml.getThirdParties(mock)));
        expect(thirdParties.find('ProjectThirdParties').length).toEqual(1);
      });
    });

    describe('getTestDuration', () => {
      it('should return empty when no score data is there', () => {
        expect(popoverHtml.getTestDuration({
          projectrunner: {
            test: {
              data: []
            }
          }
        })).toEqual('');
      });

      it('should show tests duration', () => {
        const mock = {
          projectrunner: {
            test: {
              data: [
                { name: 'foo', execution_time: 10 },
                { name: 'bar', execution_time: 20 },
              ]
            }
          }
        };

        const pkgs = mock.projectrunner.test.data;
        const testDuration = shallow(withTheme(popoverHtml.getTestDuration(mock)));
        const cols = testDuration.find('TableRowColumn');

        expect(cols.at(0).children().node).toEqual(pkgs[0].name);
        expect(cols.at(1).children().node).toEqual(pkgs[0].execution_time);

        expect(cols.at(2).children().node).toEqual(pkgs[1].name);
        expect(cols.at(3).children().node).toEqual(pkgs[1].execution_time);
      });
    });

    describe('getTestList', () => {
      it('should return empty when no score data is there', () => {
        expect(popoverHtml.getTestList({
          projectrunner: {
            test: {
              data: []
            }
          }
        })).toEqual('');
      });

      it('should generate test list', () => {
        const mock = {
          projectrunner: {
            test: {
              data: [
                {
                  name: 'foo',
                  execution_time: 10,
                  tests: [
                    {
                      name: 'TestCodenameGeneration',
                      execution_time: 0.01,
                      passed: true,
                    },
                    {
                      name: 'TestCodenameFoo',
                      execution_time: 0.04,
                      passed: false,
                    }
                  ]
                },
              ]
            }
          }
        };
        const testMock = mock.projectrunner.test.data[0].tests;
        const testList = shallow(withTheme(popoverHtml.getTestList(mock)));
        const cols = testList.find('TableRowColumn');

        expect(cols.at(0).children().node).toEqual(testMock[0].name);
        expect(cols.at(1).children().node).toEqual(testMock[0].execution_time);
        expect(cols.at(2).children().text()).toEqual('<ActionCheckCircle />');

        expect(cols.at(3).children().node).toEqual(testMock[1].name);
        expect(cols.at(4).children().node).toEqual(testMock[1].execution_time);
        expect(cols.at(5).children().text()).toEqual('<AlertError />');
      });
    });
  });
});
