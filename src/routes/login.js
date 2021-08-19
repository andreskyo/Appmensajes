const express=require('express');
const router=express.Router();
const User=require('../models/users')
const passport=require('passport')
const {isAuthenticated}=require('../helpers/auth')

router.get('/users/login',(req,res)=>{
    res.render('users/login')
})



router.post ('/users/login', passport.authenticate ('local',{
     successRedirect:"/users/panel",
    failureRedirect:"/users/login",
    
    
}))

router.get('/users/registro',(req,res)=>{
    res.render('users/registro')
})

router.post('/users/registro', async(req,res)=>{
    const errors=[];
    const {name,email,password,confirm_password}=req.body
   if(!name){
    errors.push({text : "password no coinciden "}) 
   }
   if(!email){
    errors.push({text : "password no coinciden "}) 
   }
   if(!password){
    errors.push({text : "password no coinciden "}) 
   }
   if(!confirm_password){
    errors.push({text : "password no coinciden "}) 
   }

    if(password!=confirm_password){
        errors.push({text : "password no coinciden "})
    }
    if(errors.length>0){
        res.render('users/registro',{errors,name,email,password,confirm_password})
    }else{
       const emailUser=await User.findOne({email:email})
       if(emailUser){
           req.flash('error_msg','email en uso')
           res.redirect('/users/registro')
       }
       const newUser= new User({name,email,password})
       newUser.password=await newUser.encryptPassword(password)
       await newUser.save()
       res.redirect('/users/login')
      
    }
    
})


router.get('/users/panel',isAuthenticated,async(req,res)=>{
    const lista=await User.find()
   res.render('panel',{lista})
})



router.get('/users/logout',isAuthenticated,(req,res)=>{
    req.logout();
    res.redirect('/')
})



//messages

router.post('/mensajes',(req,res)=>{
   const{mensajes}=req.body;
   console.log(req.body)
})

router.get('/historial',(req,res)=>{
    res.render('historial')
})

module.exports=router;