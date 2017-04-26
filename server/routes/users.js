import express from 'express';
import validateInput from '../shared/validations/signup';

let router = express.Router();

router.post('/', (req,res) => {

  // validate input from request body, then return us any errors and whether the form input was valid
  const { errors, isValid } = validateInput(req.body);

  // return a server error if form input was not valid, along with any errors
  if(!isValid) {
    res.status(400).json(errors);
  }
});

export default router;
