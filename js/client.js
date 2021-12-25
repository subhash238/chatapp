const socket= io();

const form=document.getElementById('send-container');
const messageInput=document.getElementById("messageInp");
const messageContainer=document.querySelector(".container");
var audio= new Audio('invite_ms.mp3');

const append=(message,position)=>{
    const  messsageElement=document.createElement('div');
    messsageElement.innerText=message
    messsageElement.classList.add('message');
    messsageElement.classList.add(position);
    messageContainer.append(messsageElement);
    if(position =='left'){
        audio.play()
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message=messageInput.value;
    append(`You:- ${message}`,'right')
    socket.emit('send',message);
    messageInput.value='';
})
const names= prompt("Enter your name to join");

socket.emit('new-user-joined', names);

socket.on('user-joined',names=>{
    append(`${names} joined the chat`,'right')
})
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})
socket.on('left',names=>{
    append(`${names}: left the chat`,'left')
})