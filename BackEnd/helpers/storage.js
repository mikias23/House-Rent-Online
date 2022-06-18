const multer = require('multer');
const House= require('../models/house');
// const City= require('../models/city')
// const Location= require('../models/location')
var arrayFileName = new Array(), imageCity, imageLocation;

const storageLocation= multer.diskStorage(
    {
       
        destination:(req, file, cb) => {
            console.log('sdsd')
            cb(null, 'images')
        },
        filename:(req,file,cb) => {

         const fileName = `${Date.now()}_${file.originalname}`;
         console.log(fileName);
         imageLocation = "http://localhost:3000/images/"+ fileName;
         arrayFileName.push(imageLocation);
         cb(null, fileName);
        }
    }
)
const upload= multer({storage: storageLocation}).array('images');

module.exports.saveUpload = async function(newHouse)
 {
     const newHouseSave = new House({
        type: newHouse.type,
        rooms: newHouse.rooms,
        status: newHouse.status,
        price: newHouse.price,
        floor: newHouse.floor,
        imageType: newHouse.imageType,
        location:newHouse.location,
        userID: newHouse.userID,
        imagePath:arrayFileName,
        stair: newHouse.stair,
        city: newHouse.city,
        area:newHouse.area,
        bedRoom:newHouse.bedRoom,
        phoneRenter: newHouse.phoneRenter,
        purpose: newHouse.purpose,
        rentPlan: newHouse.rentPlan
 })
    arrayFileName = [];
   const result = await House.addHouse(newHouseSave, (err) => {  
        if(err)
        {   
         return false;
        }
        else {
        return true;
        }})
    
    return result;


//     async function uploadHouse()
//     {
       
//        const result = await  
//             return result;
//     }
// return  uploadHouse();
}

module.exports.upload = upload