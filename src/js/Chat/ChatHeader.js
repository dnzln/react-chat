import React from 'react';


export default class ChatHeader extends React.Component {
  render() {
    return (
      <div className="card-header chat-header">
        <span className="chat-title">My Chat</span>
        <span>{this.props.membersTotal} participants</span>
        <span>{this.props.messagesTotal} messages</span>
        <span className="last-mes">last message at {this.props.lastMessageAt}</span>
      </div>
    )
  }
}

