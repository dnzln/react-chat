import React from 'react';

export default function Message({
  id, text, avatar, time, likes, likeMessage,
}) {
  const likesClasses = ['like-btn'];
  if (likes) likesClasses.push('liked');

  return (
    <div className="alert alert-light chat-message" role="alert">
      <img
        src={avatar}
        alt="Avatar"
        className="message-author-avatar"
      />

      <p className="message-text">{text}</p>
      <span className="message-time">{time}</span>
      <div className="message-like-block">
        <span className="likes">{ likes}</span>
        <button
          type="button"
          className={likesClasses.join(' ')}
          onClick={() => likeMessage(id, likes)}
        >
          &#10084;

        </button>
      </div>

    </div>
  );
}
