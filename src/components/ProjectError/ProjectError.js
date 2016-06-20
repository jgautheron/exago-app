import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class ProjectError extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    output: PropTypes.string
  };

  state = {
    showDialog: true,
  };

  closeDialog = () => {
    this.setState({
      showDialog: false
    });
  }

  render() {
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
        An error occurred while we were running {this.props.type}: <b>{this.props.error}</b><br />
        Here’s the verbose output:
        <pre>{this.props.output}</pre>
        A few reasons why we might have this issue:
        <ol>
          <li>The project is using CGO</li>
          <li>The projet is not go-gettable</li>
        </ol>
      </Dialog>
    );
  }
}
