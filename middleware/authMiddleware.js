const jwt = require('jsonwebtoken');
const User = require('../model/user');

const requireAuth = (req,res,next) =>{
    const token = req.cookies.jwt;

    //check json web token exists & is verified

    if(token){
        jwt.verify(token,'enjoy chatroom',(err,decodedToken)=>{
            if(err){
                res.redirect('/login');
            }else{
                next();
            }

        });
    }else{
        res.redirect('/login');
    }
};

//check user

const checkUser =  (req,res,next)=>{

    const token = req.cookies.jwt;

    //check json web token exists & is verified

    if(token){
        jwt.verify(token,'enjoy chatroom', async (err,decodedToken)=>{
            if(err){
                res.redirect('/login');
            }else{
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }

        });
    }else{
        res.locals.user = null;
        next();
    }

};

module.exports = {requireAuth, checkUser};

