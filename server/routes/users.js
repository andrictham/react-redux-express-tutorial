import express from 'express';
import Validator from 'validator';

let router = express.Router();

router.post('/', (req,res) => {
  console.log(req.body);
});

export default router;
