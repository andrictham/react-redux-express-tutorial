import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ field, value, label, error, type, autoFocus, onChange, checkUserExists }) => (
  <div
    // Conditionally display .has-error class if errors.username is true
    className={classnames(
      "form-group",
      { 'has-error': error }
    )}
  >
    <label className="control-label"> { label } </label>
    <input
      value={value}
      onChange={onChange}
      onBlur={checkUserExists}
      type={type}
      name={field}
      className="form-control"
      autoFocus={autoFocus}
    />
    { error && <span className="help-block">{ error }</span> }
  </div>
);

TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  checkUserExists: React.PropTypes.func
},

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;
