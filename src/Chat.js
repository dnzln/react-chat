import React, { Component } from 'react';
import * as actions from './Chat/store/actions';
import { connect } from 'react-redux';
import Loader from './Chat/Loader';
import ChatHeader from './Chat/ChatHeader';
import ChatFooter from './Chat/ChatFooter';
import ChatMessagesList from './Chat/ChatMessagesList';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.getMessages();
    
    this.updateChatStats = this.updateChatStats.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.likeMessage = this.likeMessage.bind(this);
    this.getTimeFromMs = this.getTimeFromMs.bind(this);
  }

  getMessages() {
    
    fetch('https://edikdolynskyi.github.io/react_sources/messages.json')
      .then(data => data.json())
      .then(messages => {
        
        // this.props.changeState({ messages, where: 'getMessages'})
        // console.log(this.props.messages);
        // this.props.addMessagesData(messages);
        this.updateChatStats(messages);
        // this.c++;
        // console.log(this.c);
        // this.props.changeState({ isLoading: false, where: 'getMessages 2' });
      })
  }

  updateChatStats(messagesArray = this.props.messages) {
    // console.log(this.props.messages);
    // console.log(this.props.messages2);
    const messages = [...messagesArray];
    let usersTotal = new Set();
    let messagesTotal = 0;
    let lastMessageAt = 0;

    messages.forEach(message => {
      messagesTotal++;
      usersTotal.add(message.userId);
      message.likes = message.likes || 0;
      message.date = new Date(message.createdAt);
      message.time = this.getTimeFromMs(message.createdAt);

      const messageTime = Date.parse(message.createdAt) || message.createdAt;
      lastMessageAt = lastMessageAt < messageTime ? messageTime : lastMessageAt;
    })

    lastMessageAt = this.getTimeFromMs(lastMessageAt);
    this.props.changeState({ messages, messagesTotal, lastMessageAt, participants: usersTotal.size, isLoading: false, where: 'stat' });    
  }

  getTimeFromMs(ms) {
    const date = new Date(ms)
    return `${date.getHours()}:${date.getMinutes()}`
  }

  likeMessage(id) {
    this.props.likeMessage(id);
    // console.log(this.props.messages);
    this.updateChatStats();
  }

  addMessage(text) {
    this.props.addNewMessage(text);
    // console.log(this.props.messages);
    this.updateChatStats();
  }

  deleteMessage(id) {
    this.props.deleteMessage(id);
    this.updateChatStats();
  }

  updateMessage(text, id) {
    this.props.updateMessage(text, id);
    this.updateChatStats();
  }
  
  render() {
    // const state = this.props;
    // console.log(this.props.messages);

    if (this.props.isLoading) return (<Loader></Loader>);

    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <h1>Chat</h1>
        </nav>
        <div className="container">
          <div className="card chat-container">
            <ChatHeader
              participants={this.props.participants}
              messagesTotal={this.props.messagesTotal}
              lastMessageAt={this.props.lastMessageAt}
            ></ChatHeader>
            <div className="card-body">
              <div className="messages-container">
                <ChatMessagesList
                  props={this.props}
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
      messages2: state.messages2,
      isLoading: state.isLoading,
      participants: state.participants,
      messagesTotal: state.messagesTotal,
      lastMessageAt: state.lastMessageAt,
      userId: state.userId
    }
};

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);