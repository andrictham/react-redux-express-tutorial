import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';

class SignupForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    this.setState({ errors: {} }); // clear errors on submit
    e.preventDefault();
    this.props.userSignupRequest(this.state).then(
      () => {},
      ({ data }) => this.setState({ errors: data })
    );
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

        <div
          // Conditionally display .has-error class if errors.username is true
          className={classnames(
            "form-group",
            { 'has-error': errors.username }
          )}
        >
          <label className="control-label"> Username </label>
          <input
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            name="username"
            className="form-control"
          />
          { errors.username && <span className="helpblock">{ errors.username }</span> }
        </div>

        <div
          // Conditionally display .has-error class if errors.email is true
          className={classnames(
            "form-group",
            { 'has-error': errors.email }
          )}
        >
          <label className="control-label"> Email </label>
          <input
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            name="email"
            className="form-control"
          />
          { errors.email && <span className="helpblock">{ errors.email }</span> }
        </div>

        <div
          // Conditionally display .has-error class if errors.password is true
          className={classnames(
            "form-group",
            { 'has-error': errors.password }
          )}
        >
          <label className="control-label"> Password </label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
            className="form-control"
          />
          { errors.password && <span className="helpblock">{ errors.password }</span> }
        </div>

        <div
          // Conditionally display .has-error class if errors.passwordConfirmation is true
          className={classnames(
            "form-group",
            { 'has-error': errors.passwordConfirmation }
          )}
        >
          <label className="control-label"> Confirm Password </label>
          <input
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            type="password"
            name="passwordConfirmation"
            className="form-control"
          />
          { errors.passwordConfirmation && <span className="helpblock">{ errors.passwordConfirmation }</span> }
        </div>

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

          <button className="btn btn-primary btn-lg">
            Sign Up
          </button>

        </div>

      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
