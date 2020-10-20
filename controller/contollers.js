const ejs = require('ejs');



const getHomePage = (req,res)=>{

    res.render('chat',{title:'Chats'});
}


const getLoginPage = (req,res)=>{

    res.render('login',{title:'Login'});
}


const getSignupPage = (req,res)=>{

    res.render('signup',{title:'SignUp'});
}


module.exports = {
    getHomePage,
    getLoginPage,
    getSignupPage,

}