const express = require('express');
const router = express.Router();
const Upload = require('../helpers/storage')
const House = require('../models/house');
const authJwt = require('../config/jwt');

router.post('/uploadHouse', Upload.upload, (req,res) => {
  
    var newHouse;
    if(req.body.type === 'condominium' || req.body.type === 'apartment')
    { 
    newHouse = new House({
        type: req.body.type,
        userID: req.body.userID,
        phoneRenter: req.body.phoneRenter,
        purpose: req.body.purpose,
        rooms: null,
        location:req.body.location,
        city:req.body.city,
        imageType: req.body.imageType,
        floor: req.body.floor,
        bedRoom:req.body.bedRoom,
        area:'',
        status: req.body.status,
        price:req.body.price,
        stair: null,
        rentPlan: req.body.rentPlan
     
    })
 
 }
 
 else if(req.body.type === "villa")
 {
    newHouse = new House({
        type: req.body.type,
        userID: req.body.userID,
        rooms: req.body.rooms,
        phoneRenter: req.body.phoneRenter,
        purpose: req.body.purpose,
        location:req.body.location,
        city:req.body.city,
        imageType: req.body.imageType,
        floor: ' ',
        bedRoom:' ',
        area:'',
        status: req.body.status,
        price:req.body.price,
        stair: req.body.stair
     
    })
 
 }
 else {
    newHouse = new House({
        type: req.body.type,
        userID: req.body.userID,
        phoneRenter: req.body.phoneRenter,
        purpose: req.body.purpose,
        rooms: null,
        location:req.body.location,
        city:req.body.city,
        imageType: req.body.imageType,
        floor: null,
        bedRoom:null,
        area:req.body.area,
        status: req.body.status,
        price:req.body.price,
        stair: null
     
    })
   
 }
console.log('sdsd')
const uploader = Upload.saveUpload(newHouse);
 if(uploader)
 {
    return res.json({
        success:true,
        msg:'House Uploaded'
    })
 }
 else {
    {
        return res.json({
            success:false,
            msg:'House Not Uploaded'
        })
     }
 }
 
})
module.exports = router;