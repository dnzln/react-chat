/* eslint-disable no-unused-vars */
import React from 'react';
import ChatMessage from './ChatMessage';
import ChatOwnMessage from './ChatOwnMessage';
import ChatDaySeparator from './ChatDaySeparator';

export default class ChatMessagesList extends React.Component {

  render() {
    // console.log(this.props.props);
    let prevDate = this.props.messages[0].date.getDate();
    return (    
      this.props.messages.map((message) => {
        const result = [];
        const actualDate = message.date.getDate();
        if (actualDate !== prevDate) {
          const actualMonth = message.date.getMonth();
          result.push(
            <ChatDaySeparator
              day={actualDate}
              month={actualMonth}
            ></ChatDaySeparator>
          );
        }
        

        if (message.isOwn) {
          result.push(<ChatOwnMessage
            likes={message.likes}
            user={message.name}
            text={message.text}
            time={message.time}
            avatar={message.avatar}
            id={message.id}
            deleteMessage={this.props.deleteMessage}
            updateMessage={this.props.updateMessage}
            key={message.id}
          ></ChatOwnMessage>)
        } else {
          result.push(<ChatMessage
            likeMessage={this.props.likeMessage}
            likes={message.likes}
            user={message.name}
            text={message.text}
            time={message.time}
            avatar={message.avatar}
            id={message.id}
            key={message.id}
          ></ChatMessage>)
        }
        prevDate = actualDate;

        return [...result];
      })
    )
  }
}

