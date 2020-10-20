const express = require('express');
const controllers = require('../controller/contollers');
const {requireAuth} = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/',requireAuth,controllers.getHomePage)
router.get('/login',controllers.getLoginPage)
router.get('/signup',controllers.getSignupPage)

module.exports = router;