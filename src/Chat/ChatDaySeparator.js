import React from 'react';

export default class CatDaySeparator extends React.Component {

  render() {
    return (
      <div className="chat-separator-wrapper">
        <span className="chat-separator-label">{`${this.props.month}:${this.props.day}`}</span>
        <hr className="chat-separator" />
      </div>
    )
  }
}

