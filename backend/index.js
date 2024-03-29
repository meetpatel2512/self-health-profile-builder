const express = require('express');
const ConnectToDB = require('./ConnectDB/db');
const userroutes = require('./routes/user.routes');
const reportroute = require('./routes/report.routes');
const app = express();
const cors = require('cors');
require('dotenv').config();

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json())
app.use(cors(corsOptions)); 
// Connect to datbase
ConnectToDB();

app.use('/user', userroutes);
app.use('/report', reportroute);

app.listen(process.env.PORT, () => {
  console.log(`Server is Running at:http://localhost:${process.env.PORT}`);
});
