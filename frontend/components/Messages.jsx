import React from 'react';
import PropTypes from 'prop-types';

export default function Messages({ messages }) {
  return (
    <>
      <h2>Issues:</h2>
      {messages.map((message, i) =>
        // TODO: format as cards, add timestamp
        <p key={i} className={message.premium ? 'is-premium' : ''}>
          <strong>{message.sender}</strong>:<br/>
          {message.text}
          {message.total_amount ?
          <>
            <br/>
            <span className="donation">
              {/* big int to integer */}
              {message.total_amount / 1000000000000000000000000 || ''} Ⓝ
            </span>
            </> : ''}
        </p>
      )}
    </>
  );
}

Messages.propTypes = {
  messages: PropTypes.array
};
