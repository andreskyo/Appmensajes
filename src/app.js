const express=require('express');
const path=require('path')
const methodOverride=require('method-override')
const session=require('express-session');
const app=express();
const flash=require('connect-flash')
const passport=require('passport')
const http = require('http').Server(app);
const io = require('socket.io')(http);

//Base datos
require('./database')


require('../src/config/passport')
require('./sockets')(io);


//Cfg
app.set(('port'),process.env.PORT||3000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))



//Middlewares
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(session({
    secret:'mysecretapp',
    resave:true,
    saveUninitialized:true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//G. variables
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg')
    res.locals.error_msg=req.flash('error_msg')
    res.locals.user=req.user|| null;
    next();
});

//Routes
app.use(require('./routes/index'))
app.use(require('./routes/login'))

//Static
app.use(express.static(path.join(__dirname , ('public'))))


//Servidor
http.listen(app.get('port'),()=>{
    console.log(`Servidor escuchando en el puerto ${app.get('port')}`)
})