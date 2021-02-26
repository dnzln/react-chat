import React from 'react';

export default class ChatFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { inputValue } = this.state;
    const { addMessage } = this.props;

    if (inputValue.trim()) {
      addMessage(inputValue);
    }

    this.setState({ inputValue: '' });
  }

  render() {
    const { inputValue } = this.state;

    return (
      <footer className="chat-footer">
        <div className="input-group">
          <textarea
            onChange={(event) => this.setState({ inputValue: event.target.value })}
            value={inputValue}
            type="text"
            className="form-control user-message-input"
            placeholder="Message"
          />
          <div className="input-group-append">
            <button
              onClick={this.onSubmit}
              className="btn btn-primary px-5"
              type="button"
            >
              Send

            </button>
          </div>
        </div>
      </footer>
    );
  }
}
