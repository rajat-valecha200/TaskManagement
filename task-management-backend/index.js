require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const PORT = process.env.PORT;

const app = express();
app.use(express.json);
app.use(cors());

connectDB();

app.listen(PORT,()=>{
    console.log('Server started...');
});
