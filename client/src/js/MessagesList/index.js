import React from 'react';
import Message from './Message';
import OwnMessage from './OwnMessage';
import ChatDaySeparator from '../partials/ChatDaySeparator';

export default class MessagesList extends React.Component {
  render() {
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
            />,
          );
        }

        if (message.isOwn) {
          result.push(<OwnMessage
            key={message.id}
            likes={message.likes}
            user={message.name}
            text={message.text}
            time={message.time}
            id={message.id}
            messages={this.props.messages}
            deleteMessage={this.props.deleteMessage}
            updateMessage={this.props.updateMessage}
          />);
        } else {
          result.push(<Message
            key={message.id}
            likeMessage={this.props.likeMessage}
            likes={message.likes}
            user={message.name}
            text={message.text}
            time={message.time}
            avatar={message.avatar}
            id={message.id}
          />);
        }
        prevDate = actualDate;

        return [...result];
      })
    );
  }
}
