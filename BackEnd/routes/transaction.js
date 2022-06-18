const express = require('express');
const router = express.Router();
const RentRecord = require('../models/rentRecord');
const RecordHistory = require('../models/recordHistory')



router.post('/request', (req,res) => {
  var record = new RentRecord({
        clientPhone: req.body.clientPhone,
        status:req.body.status,
        dateStart : req.body.dateStart,
        dateEnd: req.body.dateEnd,
        rentPlan:req.body.rentPlan,
        houseId: req.body.houseId
    })
    RentRecord.addRecord(record,(err) => {
        if(err)
        {
            return res.json({
                success:false,
                msg:'Something went Wrong try again'
            })
        }
        else {

            return res.json({
                success:true,
                msg:'Request Sent. The Renter will respond and will contact you soon through the phone you provided for further process'
            })
        }
    })
})

router.post('/response', (req,res) => {

    let responseObj = {
        houseId: req.body.houseId,
        response: req.body.response
    }

    if(responseObj.response === 'Accepted')
    {
      RentRecord.accepted(responseObj, (err, result) => {
    
          if(err)
          {
              throw err
          }

          else {
              if(result)
              {
                var recordHistory= new RecordHistory({
                    clientPhone: req.body.clientPhone,
                    houseId: req.body.houseId
                })
                
                RecordHistory.addRecord(recordHistory, (err) => {
                    if(err)
                    {
                     res.json({
                            success:false,
                        msg:'Record Updated but not uploaded to records history collection'
                        })
                    }
                    else {
                        res.json({
                            success:true,
                        msg:'Record Updated and also uploaded to records history collection'
                        })
                    }
                })
             
              }
              else {
                res.json({
                    success:false,
                msg:'Not Updated'
                })
              }
          }
      }) 
    }
    else {
        console.log(responseObj)

        RentRecord.rejected(responseObj.houseId, (err, result) => {
            console.log(responseObj)

            if(err)
            {
                throw err
            }
  
            else {
                if(result)
                {
                    res.json({
                        success:true,
                    msg:'Deleted'
                    })
                }
                else {
                  res.json({
                      success:false,
                  msg:'Not Deleted'
                  })
                }
            }
        }) 
    }
})

module.exports = router;