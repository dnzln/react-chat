import React from 'react';

export default class CatDaySeparator extends React.Component {
  render() {
    return (
      <div className="chat-separator-wrapper">
        <span className="chat-separator-label">{`${this.props.day}:${this.props.month + 1}`}</span>
        <hr className="chat-separator" />
      </div>
    );
  }
}
