import React from 'react';

export default class ChatMessage extends React.Component {

  render() {
    const id = this.props.id;
    const text = this.props.text;
    const avatar = this.props.avatar;
    const time = this.props.time;
    const likes = this.props.likes;
    const likeMessage = this.props.likeMessage;

    const likesClasses = ['like-btn'];
    if (likes) likesClasses.push('liked')
    
    return (
      <div className="alert alert-light chat-message" role="alert">
        <img
          src={avatar}
          alt="Avatar"
          className="message-author-avatar"
        ></img>
        
        <p className="message-text">{text}</p>
        <span className="message-time">{time}</span>
        <div className="message-like-block">
          <span className="likes">{ likes}</span>
          <button
            className={likesClasses.join(' ')}
            onClick={() => likeMessage(id)}
          >&#10084;</button>
        </div>
        
      </div>
    )
  }
}

