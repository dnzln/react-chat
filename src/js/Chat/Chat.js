import React, { Component } from 'react';
import * as actions from '../store/actions';
import { connect } from 'react-redux';
import Loader from '../ChatDecoration/Loader';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatMessagesList from '../MessagesList/ChatMessagesList';
import { getNewId, getTimeFromMs } from '../service';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.id = getNewId();
    this.deleteMessage = this.deleteMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.likeMessage = this.likeMessage.bind(this);
  }

  componentDidMount() {
    fetch('https://edikdolynskyi.github.io/react_sources/messages.json')
      .then(data => data.json())
      .then(messagesData => {
        const messages = this.extendMessageData(messagesData);
        const chatStatistic = this.getChatStats(messages);
        this.props.addMessagesData({ messages, ...chatStatistic, isLoading: false });
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      const chatStatistic = this.getChatStats(this.props.messages);
      this.props.updateChatStatistic(chatStatistic);
    }
  }

  extendMessageData(messages) {
    return messages.map(message => {
      message.likes = 0;
      message.date = new Date(message.createdAt);
      message.time = getTimeFromMs(message.createdAt);
      return message;
    })
  }

  getChatStats(messages) {
    let members = new Set();
    let messagesTotal = 0;
    let lastMessageAt = 0;

    messages.forEach(message => {
      messagesTotal++;
      members.add(message.userId);
      const messageTime = Date.parse(message.createdAt) || message.createdAt;
      lastMessageAt = lastMessageAt < messageTime ? messageTime : lastMessageAt;
    })
    const membersTotal = members.size;
    lastMessageAt = getTimeFromMs(lastMessageAt);
    return { membersTotal, messagesTotal, lastMessageAt, };
  }

  createNewMessage(text) {
    return {
      text: text,
      userId: this.id,
      createdAt: Date.now(),
      date: new Date(),
      isOwn: true,
      likes: 0,
      time: getTimeFromMs(Date.now()),
      id: getNewId(),
    };
  }

  likeMessage(id) {
    this.props.likeMessage(id);
  }

  updateMessage(text, id) {
    this.props.updateMessage(text, id);
  }

  addMessage(text) {
    const message = this.createNewMessage(text);
    this.props.addNewMessage(message);
    
  }

  deleteMessage(id) {
    this.props.removeMessage(id);
  }
  
  render() {
    if (this.props.isLoading)
      return (<Loader></Loader>);

    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <h1>Chat</h1>
        </nav>
        <div className="container">
          <div className="card chat-container">
            <ChatHeader
              membersTotal={this.props.membersTotal}
              messagesTotal={this.props.messagesTotal}
              lastMessageAt={this.props.lastMessageAt}
            ></ChatHeader>
            <div className="card-body">
              <div className="messages-container">
                <ChatMessagesList
                  messages={this.props.messages}
                  deleteMessage={this.deleteMessage}
                  updateMessage={this.updateMessage}
                  likeMessage={this.likeMessage}
                ></ChatMessagesList>
              </div>
              <ChatFooter addMessage={this.addMessage}></ChatFooter>
          </div>
          
          </div>
        </div>
        <nav className="navbar navbar-light bg-light">
          <p className="navbar-brand copyright">BSA</p>
        </nav>        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      messages: state.messages,
      isLoading: state.isLoading,
      membersTotal: state.membersTotal,
      messagesTotal: state.messagesTotal,
      lastMessageAt: state.lastMessageAt
    }
};

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);