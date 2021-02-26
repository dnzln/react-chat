import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../Chat/actions';

class MessageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newText: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const text = this.state.newText;
    if (text.trim()) {
      this.props.updateMessage(text, this.props.match.params.id);
      this.setState({ newText: '' });
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit your message</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <textarea
                type="text"
                onChange={(event) => this.setState({ newText: event.target.value })}
                value={this.state.newText}
                className="form-control user-message-input"
                placeholder="Message"
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={this.onSubmit} type="button" data-dismiss="modal" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  ...actions,
};

export default connect(null, mapDispatchToProps)(MessageEditor);
