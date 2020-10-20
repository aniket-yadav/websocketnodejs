const mongoose = require('mongoose');
const { isEmail} = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

 const userSchema = new mongoose.Schema({ 
    email:{
        type:String,
        required:[true,"Please enter an email"],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    username:{
        type:String,
        required:[true,"please enter a username"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
        minlength:[6,"minimum password length is 6 character"]
    }

});

userSchema.plugin(uniqueValidator);


//fire a function before doc saved to db

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

//static methos to login user

userSchema.statics.login = async function (email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

const User = mongoose.model('user',userSchema);

module.exports = User;
