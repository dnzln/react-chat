import React from 'react';
import ChatEditMessageModal from "./ChatEditMessageModal";

export default class ChatOwnMessage extends React.Component {

  render() {
    const text = this.props.text;
    const deleteMessage = this.props.deleteMessage;
    const updateMessage = this.props.updateMessage;
    const time = this.props.time;
    const id = this.props.id;
    const likes = this.props.likes;

    return (
      <div className="alert alert-light chat-own-message" role="alert">
        
        <div className="message-user-controls">
          <button className="edit-btn" data-toggle="modal" data-target="#exampleModal">&#9998;</button>
          <button onClick={() => { deleteMessage(id) }} className="remove-btn">&#x2716;</button>
        </div>
        <p className="message-text">{ text }</p>
        <span className="message-time">{ time }</span>
        <div className="message-like-block">
          <span className="likes">{ likes}</span>
          <button className="like-btn">&#10084;</button>
        </div>

        <ChatEditMessageModal
          updateMessage={updateMessage}
          id={id}
        ></ChatEditMessageModal>
      </div>
    )
  }
}

