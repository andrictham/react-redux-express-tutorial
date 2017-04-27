import React from 'react';
import { connect } from 'react-redux';

import FlashMessage from './FlashMessage'

class FlashMessagesList extends React.Component {

  render() {
    const { messages } = this.props;

    const messagesList = messages.map(message =>
      <FlashMessage key={message.id} message={message} />
    )
    return (
      <div>{messagesList}</div>
    );
  }

}

FlashMessagesList.propTypes = {
  messages: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  }
}

export default connect(mapStateToProps)(FlashMessagesList);
