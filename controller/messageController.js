const Message  = require('../model/message');


const post_message = async (data) =>{
    const resData = JSON.parse(data);
    
    try{

        const message = await Message.create(resData);
    }
    catch(err){ }
}


const get_messages = async () =>{
    
    try{

        const messages = await Message.find();
        return messages;
    }
    catch(err){ }
}


module.exports = {
    post_message,
    get_messages
}