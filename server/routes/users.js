import express from 'express';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

function validateInput(data) {
  let errors = {}; // Errors will be pushed to this empty obj

  if (Validator.isNull(data.username)) {
    errors.username = 'This field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isNull(data.email)) {
    errors.email = 'This field is required';
  }

  if (Validator.isNull(data.password)) {
    errors.password = 'This field is required';
  }

  if (Validator.isNull(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }

  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Password must match';
  }

  if (Validator.isNull(data.timezone)) {
    errors.timezone = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors) // if no errors, isValid is true
  }
}

router.post('/', (req,res) => {

  // validate input from request body, then return us any errors and whether the form input was valid
  const { errors, isValid } = validateInput(req.body);

  // return a server error if form input was not valid, along with any errors
  if(!isValid) {
    res.status(400).json(errors);
  }
});

export default router;
