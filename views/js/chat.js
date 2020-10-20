

let ws = new WebSocket('ws://localhost:3000');
let msg = document.querySelector('#msg');
let chats = document.querySelector('#chats');
let username = document.querySelector('#username').textContent;
let sendButton = document.querySelector('#send-btn');

if(sendButton){
    
    sendButton.addEventListener('click',(e)=>{
    e.preventDefault();
    let data = {
        'user':username,
        'message':msg.value
    }
    data=JSON.stringify(data);
    if(ws.readyState == 1){
        ws.send(data);
    }
    });

}

let msgs = ``;
ws.onmessage = (messge) =>{
    
let  res = JSON.parse(messge.data);
msgs =`<li><b>${res.user}</b> : ${res.message}</li>`;
chats.innerHTML += msgs;

}