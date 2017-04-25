import React from 'react';
import SignupForm from './SignupForm.js';

class SignupPage extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4 col-xs-10 col-xs-offset-1">
          <SignupForm />
        </div>
      </div>
    );
  }

}

export default SignupPage;
