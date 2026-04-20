const {check} =require('express-validator');

exports.signupvalid = [
  check('name','Name is required').not().isEmpty(),
  check('email','please enter your email').isEmail().normalizeEmail({gmail_remove_dots:true}),
  check('password','password must be at least 8 characters long').isLength({min:8}),
  
]