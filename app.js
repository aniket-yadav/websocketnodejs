const express = require('express');
const ejs = require('ejs');
const http = require('http');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const WebSocketServer = require('websocket').server;

const routers = require('./router/routes');
const authRoute = require('./router/authRoute');
const {checkUser} = require('./middleware/authMiddleware');
const messageController = require('./controller/messageController');


const app = express();
const server = http.createServer(app);
let clients = [];
const PORT = process.env.PORT || 3000


app.use(express.static('views'))
app.use(cookieParser());
app.use(express.json());


app.set('view engine','ejs')

const dbUrl = 'mongodb+srv://USER:PASSWORD@CLUSTER.ey0dd.mongodb.net/DBNAME?retryWrites=true&w=majority';

mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then((result) => {
    server.listen(PORT,()=>{
        console.log(`app is running on http://localhost:${PORT}`);
    })
    
})
.catch((err)=>console.log(err));


//routes
app.get('*',checkUser);
app.use(authRoute);
app.use(routers);

app.use((req,res)=>{
res.status(404).render('404',{title:'Page Not found'});
});



//webSocket 

// websocket instance 

const websocketserver = new WebSocketServer({httpServer:server});

//websocket body


websocketserver.on('request',(req)=>{

    const connection = req.accept(null, req.origin);
   messageController.get_messages().then((msgs)=>{
       
    msgs.forEach((msg)=>{
        m = JSON.stringify(msg);
        connection.send(m);
    
   });
   });
    
    clients.push(connection);
    connection.on('close',()=>{
         
         clients = clients.filter((client)=>{
             if(client == connection){
                 client.close();
             }
        return client != connection;
    });
   

    });
    connection.on('message', (message)=> {
        messageController.post_message(message.utf8Data);
        clients.forEach((client)=>{
            client.send(message.utf8Data);
        })
        
    });
});
