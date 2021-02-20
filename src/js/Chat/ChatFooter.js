import React from 'react';

export default class ChatFooter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    const text = this.state.inputValue;
    if (text.trim()) {
      this.props.addMessage(text)
    }
    this.setState({inputValue:''})
  }

  render() {
    return (
      <footer className="chat-footer">
        <div className="input-group">
          <textarea
            onChange={event => this.setState({inputValue: event.target.value})}
            value={this.state.inputValue}
            type="text"
            className="form-control user-message-input"
            placeholder="Message"></textarea>
          <div className="input-group-append">
            <button
              onClick={this.onSubmit}
              className="btn btn-primary px-5"
              type="button">Send</button>
          </div>
        </div>
      </footer>
    )
  }
}


