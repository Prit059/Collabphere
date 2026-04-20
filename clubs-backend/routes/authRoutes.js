// const express = require('express');
// const router = express.Router();
// const {signupvalid} = require('../helpers/validation');
// const usercontroller = require('../controllers/usercontroller');

// router.post('/register',signupvalid,usercontroller.register);
// module.exports = router;


const express = require('express');
const { register, login, forgotPassword, resetPassword } = require('../controllers/authController');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/profile', verifyToken, getProfile);
module.exports = router;
