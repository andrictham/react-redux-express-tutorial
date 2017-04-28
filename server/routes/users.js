import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import isEmpty from 'lodash/isEmpty'

import User from '../models/user';

import commonValidations from '../shared/validations/signup';

let router = express.Router();

// Higher order function that merges our async database validation errors with our synchronous serverside validation errors

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);

  // Query db using Bookshelf to find a match for username and email
  // If either username or email already exists, then we return a validation error message

  return User.query ({
    where: { email: data.email },
    orWhere: { username: data.username }
  }).fetch().then(user => {
    if (user) {
      if (user.get('username') === data.username) {
        errors.username = 'This username is already taken. Please try another one.';
      }
      if (user.get('email') === data.email) {
        errors.email = 'This email address is already registered. Try signing in.';
      }
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  })
}

router.post('/', (req,res) => {

  // Run higher order function to validate input (ansychronously, because we need to query the database), then return us any errors and whether the form input was valid

  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    // If form input is valid, save it to the database
    // Else, return a server error

    if(isValid) {

      // First, we parse the request body (the form)
      const { username, password, timezone, email } = req.body;

      // Then we encrypt our password with a salt option of 10
      const password_digest = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      // Send the fields to our users table with our User schema
      User.forge(
        { username, timezone, email, password_digest },
        /* automatically generate a timestamp */
        { hasTimestamps: true }
      ).save()
        .then(user => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: err }));

    }
    else {
      // Return any validation errors
      res.status(400).json(errors);
    }
  })


});

export default router;
