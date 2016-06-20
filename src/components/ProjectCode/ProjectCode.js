import React, { Component, PropTypes } from 'react';

import styles from './ProjectCode.css';

import SyntaxHighlighter from 'react-syntax-highlighter';

export default class ProjectCode extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    language: PropTypes.string,
    style: PropTypes.object,
    issues: PropTypes.object
  };

  componentWillMount() {
    const issuesByLine = {};
    const codeLines = [];
    const sourceWitIssues = this.props.source.split('\n');
    const { issues } = this.props;

    // Map the issue to each line
    Object.keys(issues).forEach(key => {
      issues[key].forEach((issue) => {
        const zeroBasedLine = issue.line - 1;
        if (typeof issuesByLine[zeroBasedLine] === 'undefined') {
          issuesByLine[zeroBasedLine] = [];
        }
        const message = `// [EXAGO] ${key} line:${issue.line} column:${issue.col} - ${issue.message}`;
        issuesByLine[zeroBasedLine].push(message);
      });
    });

    // Go through each line and append the warnings + generate codeLines
    sourceWitIssues.forEach((line, idx) => {
      if (issuesByLine[idx]) {
        issuesByLine[idx].forEach((issue, issueIdx) => {
          sourceWitIssues[idx] = `${issue}\n${sourceWitIssues[idx]}`;
          codeLines.push(<span className={styles.lineNumber} key={`issue-${idx}-${issueIdx}`}>{' '}</span>);
        });
        codeLines.push(<span className={styles.lineNumberWithIssue} key={`ln-${idx}`}>{idx + 1}</span>);
      } else {
        codeLines.push(<span className={styles.lineNumber} key={`ln-${idx}`}>{idx + 1}</span>);
      }
    });

    this.sourceWitIssues = sourceWitIssues.join('\n');
    this.codeLines = codeLines;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.linesContainer}>
          <pre>
            <code>
              {this.codeLines}
            </code>
          </pre>
        </div>
        <div className={styles.code}>
          <SyntaxHighlighter language={this.props.language} style={this.props.style}>{this.sourceWitIssues}</SyntaxHighlighter>
        </div>
      </div>
    );
  }
}
