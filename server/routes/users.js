import express from 'express';
import bcrypt from 'bcrypt-nodejs';

import User from '../models/user';

import validateInput from '../shared/validations/signup';

let router = express.Router();

router.post('/', (req,res) => {

  // Validate input from request body, then return us any errors and whether the form input was valid

  const { errors, isValid } = validateInput(req.body);

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
});

export default router;
