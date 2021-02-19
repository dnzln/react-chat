import React, { Component } from 'react';
import * as actions from './Chat/store/actions';
import { connect } from 'react-redux';
import Loader from './Chat/Loader';
import ChatHeader from './Chat/ChatHeader';
import ChatFooter from './Chat/ChatFooter';
import ChatMessagesList from './Chat/ChatMessagesList';
import { getNewId, getTimeFromMs } from './Chat/service';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.id = getNewId();
    // this.getTimeFromMs = this.getTimeFromMs.bind(this);
    // this.getChatStats = this.getChatStats.bind(this);
    // this.extendMessageData = this.extendMessageData.bind(this);
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

  likeMessage(id) {
    this.props.likeMessage(id);
  }

  updateMessage(text, id) {
    this.props.updateMessage(text, id);
  }

  addMessage(text) {
    this.props.addNewMessage(text, this.id);
    const chatStatistic = this.getChatStats(this.props.messages);
    this.props.updateChatStatistic(chatStatistic);
  }

  deleteMessage(id) {
    this.props.removeMessage(id);
    const chatStatistic = this.getChatStats(this.props.messages);
    this.props.updateChatStatistic(chatStatistic);
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