import React from 'react';
import { connect } from 'react-redux';

import SignupForm from './SignupForm.js';

import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages'

class SignupPage extends React.Component {

  render() {
    const { userSignupRequest, addFlashMessage } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4 col-xs-10 col-xs-offset-1">
          <SignupForm userSignupRequest={userSignupRequest}
          addFlashMessage={addFlashMessage} />
        </div>
      </div>
    );
  }

}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

// Connect to Redux so we can dispatch the userSignupRequest action from SignupPage and SignupForm

export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage);
