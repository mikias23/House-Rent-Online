const fs= require('fs');
const path = require('path');
const RentRecords = require('../../models/rentRecord') 
const updateInterval = require('./test/updateInterval.json')


module.exports.CheckForUpdate = async function()
{
   
  
  console.log(updateInterval.interval)
  let currentDate = new Date().getTime();
  let lastUpdatedDate = updateInterval.lastUpdatedDate + 6000000;
console.log(lastUpdatedDate-currentDate)
console.log('reachsdk')
console.log(currentDate)
console.log(lastUpdatedDate)
 if(currentDate > lastUpdatedDate)
 {
  
  let obj = {
    interval: 10,
    lastUpdatedDate: currentDate
  }
  await fs.writeFile(
    path.join(__dirname, '/test', 'updateInterval.json'), JSON.stringify(obj),
    (err, data) => {
      console.log(data)
      }  )

      rentRecordsIteration(currentDate)

 }
 async function rentRecordsIteration(currentDate)
 {
   await RentRecords.getRecords(result=> {
     
      console.log(result)
      RentRecords.updateMany(currentDate, (err, result) => {
        if(err)
        {
          console.log(err)
        }
        RentRecords.getRecords(results=> {
          console.log(results)
        })
      })

   })
 }
 

  
    // let currentDate = new Date().getTime();
    // var lastCheckedDate = (Date.parse(file.lastCheckedDate));
    // lastCheckedDate+=(file.interval * 600000);

    // if(lastCheckedDate >= currentDate)
    // {
        
  
    //  console.log(file.lastCheckedDate)
    //  console.log(file.interval)
    
    //  file.interval = 1000000
    //  console.log(file.interval)
    //   fs.writeFile('updateInterval.json', JSON.stringify(file), function(err)
    //   {
    //       if(err)
    //       return console.log(err);
    //       console.log(JSON.stringify(file))
          
    //   });
     
    // }
}

    
       
