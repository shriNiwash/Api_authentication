const mongoose = require('mongoose');
require('dotenv').config();

//Now Making the connection with database
const conn =process.env.connection;
mongoose.connect(conn,{useNewUrlParser: true,useUnifiedTopology:true}).
then(()=>console.log("The database Conenction is successfull")).catch((err)=>console.log(err));

