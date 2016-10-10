import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class ProjectError extends Component {
  static propTypes = {
    results: PropTypes.object.isRequired,
  };

  state = {
    showDialog: true,
  };

  getError() {
    const { results } = this.props;
    if (results.hasOwnProperty('errors')) {
      const globalErrors = Object.keys(results.errors);
      if (globalErrors.length > 0) {
        return { name: globalErrors[0], message: results.errors[globalErrors[0]] };
      }
    }

    let i;
    const projectrunnerErrorList = Object.keys(results.projectrunner);
    for (i = 0; i < projectrunnerErrorList.length; i++) {
      const key = projectrunnerErrorList[i];
      const { label, error, raw_output } = results.projectrunner[key];
      if (error) {
        return { name: label, message: error, output: raw_output };
      }
    }

    return {};
  }

  closeDialog = () => {
    this.setState({
      showDialog: false
    });
  }

  render() {
    const processingError = this.getError();
    return (
      <Dialog
        title="Could not run Exago"
        autoScrollBodyContent
        actions={
          <FlatButton
            label="Discard"
            primary
            onTouchTap={this.closeDialog}
          />
        }
        modal={false}
        open={this.state.showDialog}
        onRequestClose={this.closeDialog}
      >
        <p style={{ paddingTop: 10 }}>
          An error occurred while we were running {processingError.name}: <b>{processingError.message}</b><br />
          Here’s the verbose output:
        </p>
        <pre>{processingError.output}</pre>
        A few reasons why we might have this issue:
        <ol>
          <li>The project is using CGO</li>
          <li>The projet is not go-gettable</li>
        </ol>
      </Dialog>
    );
  }
}
