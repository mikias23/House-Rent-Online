const express = require('express');
const router = express.Router();
const House = require('../models/house');
const RentRecord = require('../models/rentRecord');
const Admin = require('../models/admin')
const User = require('../models/user')

router.get('/getHouses', (req, res) => {
    House.getHouse((err, houses) => {
        if(err)
        throw err;

        if(!houses){
            return res.json({
                success:false,
                msg:'Something went wrong.. perhaps empty database'
            })
        }
        else{
            return res.json({
                success:true,
                houses:houses
            })
        }
    } )
 })
 router.get('/getAdmin',(req, res) => {
     
    Admin.getAdmin((err,  admin) => {

        if(err)
        throw err;

        if(!admin){
            return res.json({
                success:false,
                msg:'Something went wrong.. perhaps empty database'
            })
        }
        else{
            return res.json({
                success:true,
                admin:admin
            })
        }
    } )

 })
 
 router.get('/getUsers', (req, res) => {
   
        User.getUsers((err, users) => {
            if(err)
            throw err;
    
            if(!users){
                return res.json({
                    success:false,
                    msg:'Something went wrong.. perhaps empty database'
                })
            }
            else{
                return res.json({
                    success:true,
                    users:users
                })
            }
        } )
    
    
    
 })

 router.get('/rentRecords', (req,res) => {
    RentRecord.getRecords((err, rentRecords) => {
        if(err)
        throw err;

        if(!rentRecords){
            return res.json({
                success:false,
                msg:'Something went wrong.. perhaps empty database'
            })
        }
        else{
            return res.json({
                success:true,
                rentRecords:rentRecords
            })
        }
    } )

 })
 
module.exports = router;