const jwt = require('jsonwebtoken');
const User = require('../model/user');

//handle errors
const handleErrors = (err) =>{
    let errors = {email:'',password:'',username:''};

    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'Email does not exists';
    }

    //incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'Password is incorrect';
    }

    // //duplicate email error
    // if(err.code === 11000){
    //     errors.email = 'Email is already registered';
    //     return errors;
    // }

    //validate errors
    if(err._message == 'user validation failed'){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
            if(properties.type=='unique'){
                if(properties.path=='email'){
                    errors.email = 'Email is already registered';
                }
                if(properties.path == 'username'){
                    errors.username = 'Username is already used please try other '
                }
            }
        });
    }
    return errors;
}

//create json web token

const maxAge = 3*24*60*60;
const createToken = id =>{
    return jwt.sign({id},'enjoy chatroom', {expiresIn : maxAge});

};

//controller actions 

const signup_post = async (req,res) =>{
    const {email,password,username } = req.body;
    
    try{

        const user = await User.create({email:email,password:password,username:username});
        const token = createToken(user._id);
      
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({user:user._id});
    }
    catch(err){
       
     
        const errors = handleErrors(err);
        res.status(400).json({errors});
        
    }
}

const login_post = async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
      
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json({user:user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

const logout_get = (req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}


module.exports = {
    login_post,
    signup_post,
    logout_get
}