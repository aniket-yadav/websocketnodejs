const express = require('express');
const controllers = require('../controller/contollers');

const router = express.Router();

router.get('/',controllers.getHomePage)
router.get('/login',controllers.getLoginPage)
router.get('/signup',controllers.getSignupPage)

module.exports = router;