const socket=io()


let mensaje=document.getElementById('mensaje')
let user=document.getElementById('user').textContent;
let enviar=document.getElementById('send')
let output=document.getElementById('output')
let historiall=document.getElementById('historial')
let abrir=document.getElementById('abrir')

abrir.addEventListener('click',()=>{
    historiall.style.display="block"
})


enviar.addEventListener('click',()=>{
    socket.emit ('chat:message',{
        mensaje:mensaje.value,
        user:user
    })
})


socket.on('chat:message',(data)=>{
    output.innerHTML+=`<p><strong> ${data.user} </strong> : ${data.mensaje}</p>`
    
})


socket.on('mhistorial',historial=>{
    for(let i=0;i<historial.length;i++){
        historiall.innerHTML+=`<p><strong> ${historial[i].nick} </strong> : ${historial[i].msg}</p>`  
    }
})