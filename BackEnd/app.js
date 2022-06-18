const express = require('express');
const path = require('path')
const fs = require('fs');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const User  = require('./routes/user');
const Upload  = require('./routes/upload');
const Fetch = require('./routes/fetch');
const Transaction  = require('./routes/transaction');

const app = express();



app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

//|| 'mongodb://localhost:27017/houseRent'
mongoose.connect("mongodb://localhost:27017/houseRentRefined" , {
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

mongoose.connection.on('connected', ()=> {
    console.log('Database Connected to  '+ 'mongodb://localhost:27017/houseRentRefined')})

    

app.use(bodyParser.json());
app.use("/images", express.static(path.join("images")));  
app.use('/users', User);
app.use('/uploads', Upload);
app.use('/fetch', Fetch);
app.use('/transaction', Transaction);


app.listen(3000, ()=> {
    console.log('Server Connected to' + 3000)
})