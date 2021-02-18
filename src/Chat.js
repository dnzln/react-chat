import React from 'react';
import Loader from './Chat/Loader';
import ChatHeader from './Chat/ChatHeader';
import ChatFooter from './Chat/ChatFooter';
import ChatMessagesList from './Chat/ChatMessagesList';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      isLoading: true,
      participants: 0,
      messagesTotal: 0,
      lastMessageAt: 0,
      userId: "id" + Math.random().toString(16).slice(2)
    };

    this.getMessages();

    this.deleteMessage = this.deleteMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.likeMessage = this.likeMessage.bind(this);    
  }

  getChatStat(messagesArray = this.state.messages) {
    const messages = messagesArray;
    let users = new Set();
    let messagesTotal = 0;
    let lastMessageAt = 0;

    messages.forEach(message => {
      messagesTotal++;
      users.add(message.userId);
      message.date = new Date(message.createdAt);
      const messageTime = Date.parse(message.createdAt) || message.createdAt;
      lastMessageAt = lastMessageAt < messageTime ? messageTime : lastMessageAt;
      message.time = this.getTimeFromMs(message.createdAt);
      message.likes = message.likes || 0;
    })

    lastMessageAt = this.getTimeFromMs(lastMessageAt);

    this.setState({ ...this.state, messages, messagesTotal, lastMessageAt, participants: users.size });
  }

  getTimeFromMs(ms) {
    const date = new Date(ms)
    return `${date.getHours()}:${date.getMinutes()}`
  }

  getMessages() {
    fetch('https://edikdolynskyi.github.io/react_sources/messages.json')
      .then(data => data.json())
      .then(messages => {
        this.setState({ messages });
        this.getChatStat();
        this.setState({ ...this.state, isLoading: false });
      })
  }

  likeMessage(id) {
    const messages = this.state.messages.map(message => {
      if (message.id === id) message.likes = message.likes > 0 ? 0 : 1;
      return message;
    });
    this.getChatStat(messages);
  }

  addMessage(text) {
    const messages = this.state.messages.concat([{
      text: text,
      createdAt: Date.now(),
      id: "id" + Math.random().toString(16).slice(2),
      userId: this.state.userId,
      isOwn: true,
    }]);
    this.getChatStat(messages);
  }

  deleteMessage(id) {
    const messages = this.state.messages.filter(message => message.id !== id);
    this.getChatStat(messages);
  }

  updateMessage(text, id) {
    const messages = this.state.messages.map(message => {
      if (message.id === id) message.text = text;
      return message;
    });
    this.getChatStat(messages);
  }
  
  render() {
    const state = this.state;

    if (state.isLoading) return (<Loader></Loader>);

    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <h1>Chat</h1>
        </nav>
        <div className="container">
          <div className="card chat-container">
            <ChatHeader
              participants={state.participants}
              messagesTotal={state.messagesTotal}
              lastMessageAt={state.lastMessageAt}
            ></ChatHeader>
            <div className="card-body">
              <div className="messages-container">
                <ChatMessagesList
                  messages={state.messages}
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