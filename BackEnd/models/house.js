const mongoose = require('mongoose');


const houseSchema = mongoose.Schema({

    userID:{
        type: String,
        required: true
    },
    rooms:{
       type: Number
        },
    type: {
        type:String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    phoneRenter: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    area: {
        type: String
    },
    floor: {
        type: String
    },
    stair: {
        type: Number
        },
    bedRoom: {
        type: Number
    },
    rentPlan : {
        type:String
    },
    imagePath:[],
    imageType: []

});


const House = module.exports = mongoose.model('House', houseSchema);

module.exports.addHouse = function(newHouse, callback){
   console.log('sdsd')
    console.log(newHouse)
    console.log('sddsdsd')
 newHouse.save(callback);
};
module.exports.getHouse= function(callback){
    House.find({}, callback)
};
module.exports.getHouseByType= function(renterHouseId,callback){
     let userIdRenter={userID: renterHouseId};
    House.find(userIdRenter, callback)
};
module.exports.getHouseById= function(id,callback){
    let houseId={_id:id};
   House.find(houseId, callback)
};
module.exports.deleteHouse= function(id, callback){
    const query = {_id: id};
   House.deleteOne(query,callback)
};
module.exports.deleteHouseBasedOnUserId= function(id, callback){
    const query = {userID: id};
   House.deleteOne(query,callback)
};
module.exports.deleteHouses= function(id, callback){
    const query = {userID: id};
    if(id)
    {
        House.deleteMany({query},callback)
   
    }
    else {
        House.deleteMany({},callback)

    }
};
