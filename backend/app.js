const express = require('express');
const app = express();
const cookieparser=require('cookie-parser');
const bodyparser=require('body-parser');
const cors=require('cors');
const errorMiddleware=require('./middleware/error');

const path=require('path');

app.use(cors({
    origin:['http://localhost:3000','*'],
    methods:['GET','POST','PUT','DELETE'],
    Credentials:true
}));

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended: true}));

const category=require('./routes/categoryRoute')
const brand=require('./routes/brandRoute');
const user=require('./routes/userRoute');

app.use('/api/v1',category);
app.use('/api/v1',brand);
app.use('/api/v1',user);

app.use(errorMiddleware);
module.exports = app;