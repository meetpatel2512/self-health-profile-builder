const mongoose = require('mongoose');

const ConnectToDB = async()=>{
await mongoose.connect(process.env.DB_URL)
console.log("Database Connected Sucessfully");
}
module.exports = ConnectToDB;