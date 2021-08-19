const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://1234:1234@cluster0.fvl8q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(db=>{console.log("Mongo conectado")})
.catch(err=>{console.log(err)})