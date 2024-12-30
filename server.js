const express = require('express');
const errorHandler = require('./middelware/errorHandler.js');
const connectDB = require('./config/connectDB.js');
const dotenv = require('dotenv').config();


connectDB();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3003;
 
app.use("/api/contacts", require("./routes/contactsroutes.js"));
app.use("/api/users", require("./routes/userroutes.js"));
app.use(errorHandler)
   
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

