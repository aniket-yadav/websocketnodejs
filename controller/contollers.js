const ejs = require('ejs');


const getHomePage = (req,res)=>{

    res.render('chat');
}


const getLoginPage = (req,res)=>{

    res.render('login');
}


const getSignupPage = (req,res)=>{

    res.render('signup');
}

module.exports = {
    getHomePage,
    getLoginPage,
    getSignupPage
}