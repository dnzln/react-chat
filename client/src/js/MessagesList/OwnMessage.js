import React from 'react';
import { useHistory } from 'react-router';

export default function OwnMessage({
  text, deleteMessage, time, id, likes,
}) {
  const history = useHistory();

  return (
    <div className="alert alert-light chat-own-message" role="alert">

      <div className="message-user-controls">
        <button type="button" onClick={() => { history.push(`/message/${id}`); }} className="edit-btn" data-toggle="modal" data-target="#exampleModal">&#9998;</button>
        <button type="button" onClick={() => { deleteMessage(id); }} className="remove-btn">&#x2716;</button>
      </div>
      <p className="message-text">{ text }</p>
      <span className="message-time">{ time }</span>
      <div className="message-like-block">
        <span className="likes">{ likes}</span>
        <button type="button" className="like-btn">&#10084;</button>
      </div>
    </div>
  );
}
