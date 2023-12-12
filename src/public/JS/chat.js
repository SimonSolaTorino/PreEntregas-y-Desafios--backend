import Swal from 'sweetalert2'
const socket = io()

let user
let chatBox = document.getElementById('chat_box')
let log = document.getElementById('messageLog')
let data

socket.on('message', mensaje=>{
    data = mensaje
})

socket.on('messageLogs', msgs=>{
    renderizar(msgs)
})

const renderizar = (msgs)=>{
    let messages = ''

    mensaje.forEach(message => {
        const isCurrentUser = message.user === user
        const messageClass = isCurrentUser ? 'my-message' : 'other-message'
        messages = messages + `<div class="${messageClass}">${message.user}: ${message.message}</div>`
        log.innerHTML = messages
        chatBox.scrollIntoView(false)
    });

}

Swal.fire({
    title: 'identificate',
    input: 'email',
    text:'ingresa tu correo para identificarte',
    inputValidator: (value)=>{
        if(!value){
            return "necesitas ingresar un correo"
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.text(value)){
            return "correo invalido ingresa otro"
        }
        return null
    },
    allowOutsideClick: false
}).then(result=>{
    if(result.isConfirmed){
        user = result.value
        renderizar(data)
    }
})

chatBox.addEventListener('keyup', event=>{
    if(event.key == 'Enter'){
        if(chatBox.value.trim().length > 0){
            const message = chatBox.value
            socket.emit('message', {user, message})
            chatBox.value = ''
        }
    }
})

socket.on('nuevo_user', ()=>{
    Swal.fire({
        text: 'Nuevo usuario conectado',
        toast: true,
        position: 'top-right'
    })
})