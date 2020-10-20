const mongoose = require('mongoose');

messageSchema = new mongoose.Schema({

    user:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    }

});

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;