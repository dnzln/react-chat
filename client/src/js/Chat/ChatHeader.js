import React from 'react';

export default function ChatHeader({ membersTotal, messagesTotal, lastMessageAt }) {
  return (
    <div className="card-header chat-header">
      <span className="chat-title">My Chat</span>
      <span>
        {membersTotal}
        {' '}
        participants
      </span>
      <span>
        {messagesTotal}
        {' '}
        messages
      </span>
      <span className="last-mes">
        last message at
        {' '}
        {lastMessageAt}
      </span>
    </div>
  );
}
