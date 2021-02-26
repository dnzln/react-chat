import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import Loader from '../partials/Loader';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatMessagesList from '../MessagesList';
import { getNewId } from '../services/idGenHelper';
import { getChatStats, createNewMessage } from '../services/messagesHelpers';

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
    this.props.getMessages();
  }

  componentDidUpdate(prevProps) {
    const { messages, updateChatStatistic } = this.props;
    if (prevProps.messages.length !== messages.length) {
      const chatStatistic = getChatStats(messages);
      updateChatStatistic(chatStatistic);
    }
  }

  likeMessage(id, likes) {
    this.props.likeMessage(id, likes);
  }

  updateMessage(text, id) {
    this.props.updateMessage(text, id);
  }

  addMessage(text) {
    const message = createNewMessage(text, this.id);
    this.props.addNewMessage(message);
  }

  deleteMessage(id) {
    this.props.removeMessage(id);
  }

  render() {
    const {
      membersTotal,
      messagesTotal,
      lastMessageAt,
      isLoading,
      messages,
    } = this.props;

    if (isLoading) return (<Loader />);

    return (
      <div>
        <div className="container">
          <div className="card chat-container">
            <ChatHeader
              membersTotal={membersTotal}
              messagesTotal={messagesTotal}
              lastMessageAt={lastMessageAt}
            />
            <div className="card-body">
              <div className="messages-container">
                <ChatMessagesList
                  messages={messages}
                  deleteMessage={this.deleteMessage}
                  updateMessage={this.updateMessage}
                  likeMessage={this.likeMessage}
                />
              </div>
              <ChatFooter addMessage={this.addMessage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages.messages,
  isLoading: state.messages.isLoading,
  membersTotal: state.messages.membersTotal,
  messagesTotal: state.messages.messagesTotal,
  lastMessageAt: state.messages.lastMessageAt,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
