const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels'


mongoose.connect(mongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true 
})

//get the default connection 
//Mongoose maintain a default connection object representing the MongoDB Connecion
const db = mongoose.connection;

//define event listener for database connection

db.on('connected',() => {
    console.log('Connected to MongoDb Server');
})

db.on('error' , (err) => {
    console.error('MongoDB connection error: ', err)
})

db.on('disconnected' , () => {
    console.log('MongoDB discoonected');
})

//export the database connection
module.exports = db;