const mongoose=require('mongoose');
const {Schema}=mongoose;



const chatapp=new Schema({
    nick:{type:String},
    msg:{type:String}
})

module.exports=mongoose.model('Mensajes',chatapp)