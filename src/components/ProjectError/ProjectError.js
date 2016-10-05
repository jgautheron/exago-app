import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class ProjectError extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    output: PropTypes.object
  };

  state = {
    showDialog: true,
  };

  getError() {
    const { errors, output } = this.props;
    if (errors.goget !== '') {
      return { name: 'goget', message: errors.goget, output: output.goget };
    }
    if (errors.gotest !== '') {
      return { name: 'gotest', message: errors.gotest, output: output.gotest };
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
          <pre>{processingError.output}</pre>
          A few reasons why we might have this issue:
          <ol>
            <li>The project is using CGO</li>
            <li>The projet is not go-gettable</li>
          </ol>
        </p>
      </Dialog>
    );
  }
}
