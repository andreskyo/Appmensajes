const Chat=require('../src/models/mensajes')

module.exports=function(io){





    io.on('connection',async(socket)=>{
      
       let historial= await Chat.find({});
       socket.emit('mhistorial', historial)

       socket.on('chat:message',async(data)=>{

        newMensajes=new Chat({msg:data.mensaje,nick:data.user})
        await newMensajes.save();

         io.sockets.emit('chat:message',data)
           
       })
       

    })
    

}