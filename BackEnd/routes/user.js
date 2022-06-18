'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authJwt = require('../config/jwt');
const CheckUpdate=  require('./checkUpdate/checkUpdate')
const Admin = require('../models/admin')


router.post('/register',(req,res) => {
    let newUser = new User({
             
        username:req.body.username,
        phone:req.body.phone,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password:req.body.password
    })
    let  Credential = {username: newUser.username, phone: newUser.phone  } 
    User.authenticateUser(Credential, (err, user) => {

       if(!user)
       {
           User.addUser(newUser, (err,user) => {
               if(err){
                res.json({success:false, msg:"failed to register user"});
                 
               }
                else {
                    res.json({success: true, msg:'User registered'});
                    
              }
           })
       }
       else {
           if(newUser.username == "Admin" || newUser.username == "admin" || newUser.username == "Administrator" || newUser.username == "administrator" ||
           newUser.username == "admin")
           {

               res.json({success:false, msg:"Change Username "});
           }
           else
           {

            if(newUser.username == user.username)
               res.json({success:false, msg:"Change username, username already Exists"});
            else 
            {
            res.json({success:false, msg:"Change Phone,  number already used"});

            }    
           }



       }
    })
})
router.post('/login',(req,res) => {
    CheckUpdate.CheckForUpdate();

   let authenticateUser = {
            username:req.body.username,
            password:req.body.password
         };
    let loginCredential = { username : authenticateUser.username, phone:null}

    if(req.body.type === 'admin')
    {
        console.log(authenticateUser)
        Admin.authenticateUser(loginCredential, (err,user) => {
            if(err){
                return res.json({
                    success:false,
                    msg:'something Went Wrong'
                })
            }
         if(!user){
             console.log(user)
                return res.json({
                    success:false,
                    msg:'Incorrect Username'
                })
            }
            console.log('username foun')
        Admin.comparePassword(authenticateUser.password, user.password, (err, isMatch) =>
            {

                console.log(authenticateUser.password , user.password)
                if(err){
                    res.json(
                        {
                            success:false, 
                            msg:"unkown error"});
                        }
                    else {
                        if(isMatch)
                        {
                       var token  = jwt.sign({_id: user._id}, 'secret', {
                          expiresIn: 604800
                      });
                        return res.json({
                            success:true,
                            msg:'success',
                            user:user,
                            token:token,
                            userType:'admin'
                        })
                       }
    
                       else {
                        return res.json({
                            success:false,
                            msg:'Incorrect Password'
                        })
                       }
                                           
                  }
    
            }) 
    
         })
     
    }

    else {
    User.authenticateUser(loginCredential, (err,user) => {
        if(err){
            return res.json({
                success:false,
                msg:'something Went Wrong'
            })
        }
     if(!user){
            return res.json({
                success:false,
                msg:'Incorrect Username'
            })
        }
    User.comparePassword(authenticateUser.password, user.password, (err, isMatch) =>
        {
            if(err){
                res.json(
                    {
                        success:false, 
                        msg:"unkown error"});
                    }
                else {
                    if(isMatch)
                    {
                   var token  = jwt.sign({_id: user._id}, 'secret', {
                      expiresIn: 604800
                  });
                    return res.json({
                        success:true,
                        msg:'success',
                        user:user,
                        token:token
                    })
                   }

                   else {
                    return res.json({
                        success:false,
                        msg:'Incorrect Password'
                    })
                   }
                                       
              }

        }) 

     })
    }

})
router.get('/profile', authJwt, (req,res) => {
    return res.json({
        success:false,
        msg:'something Went Wrong'
    })
})

module.exports = router;