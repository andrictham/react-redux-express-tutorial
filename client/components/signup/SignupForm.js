import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory } from 'react-router';


class SignupForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') /* Check if field is not empty */ {
      this.props.doesUserExist(val).then(res => {
        let errors = this.state.errors;
        if (res.data.user) {
          errors[field] = 'This ' + field + ' is taken. Please try another one.';
          this.state.invalid = true;
        } else {
          errors[field] = '';
          this.state.invalid = false;
        }
        this.setState({ errors, invalid })
      });
    }
  }

  // Validates form on client side first
  isValid() {
    // Calls our shared validation function, the same one that is on the server
    const { errors, isValid } = validateInput(this.state);

    // Sets state with our errors
    if(!isValid) {
      this.setState({ errors });
    }

    // Return true or false so we can check it onSubmit
    return isValid;
  }

  // Submits the form to server
  onSubmit(e) {
    e.preventDefault();

    // Only if our form is valid do we make a server request
    if(this.isValid()) {
      // Clear errors on submit
      this.setState({ errors: {}, isLoading: true });

      // Dispatch redux-thunk action to post the form, then return errors, if any
      this.props.userSignupRequest(this.state).then(
        // on success
        () => {
          // dispatch action addFlashMessage
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          // redirect
          this.context.router.push('/');
        },
        // or on failure
        ({ data }) => this.setState({ errors: data, isLoading: false })
      );
    }

  }

  render() {

    // Use Lodash’s map function to map through timezones in data/timezones.js, creating dropdown options for use in our Timezone dropdown.

    const options = map(timezones, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );

    // Destructure errors from state
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>

        <TextFieldGroup
          field="username"
          label="Username"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          error={errors.username}
        />

        <TextFieldGroup
          field="email"
          label="Email"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.email}
          error={errors.email}
        />

        <TextFieldGroup
          field="password"
          label="Password"
          type="password"
          onChange={this.onChange}
          value={this.state.password}
          error={errors.password}
        />

        <TextFieldGroup
          field="passwordConfirmation"
          label="Confirm Password"
          type="password"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          error={errors.passwordConfirmation}
        />

        <div
          // Conditionally display .has-error class if errors.timezone is true
          className={classnames(
            "form-group",
            { 'has-error': errors.timezone }
          )}
        >
          <label className="control-label"> Timezone </label>
          <select
            value={this.state.timezone}
            onChange={this.onChange}
            name="timezone"
            className="form-control"
          >
            <option value="" disabled>Choose your timezone</option>
            { options }
          </select>
          { errors.timezone && <span className="helpblock">{ errors.timezone }</span> }
        </div>

        <div className="form-group">

          <button className="btn btn-primary btn-lg" disabled={ this.state.isLoading || this.state.invalid }>
            Sign Up
          </button>

        </div>

      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  doesUserExist: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm;
