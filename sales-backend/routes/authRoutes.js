const express = require('express');
const router = express.Router();
const authController = require('../controller/authController'); 

router.post('/signup', authController.postSignup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.me);
router.get('/session', authController.verifySession);

module.exports = router;