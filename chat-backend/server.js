
// importing 

import express from 'express'
import mongoose from 'mongoose'
import { notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

import 'dotenv/config'


// const express = require("express")
// const mongoose = require("mongoose");
// const userRoutes = require("./routes/userRoutes");

//app configuration

const app=express();
app.use(express.json());
const port =process.env.PORT || 9000





//db config
mongoose.connect('mongodb+srv://aswin:ynwa20@cluster0.m74b3.mongodb.net/chatDatabase?retryWrites=true&w=majority').then(console.log('DB connection established'))


//????

//api routes

app.get('/',(req,res)=>{res.status(200).send('hello world')})
app.post('/',(req,res)=>{
    const user=req.body
    console.log(user)
})
app.use('/user',userRoutes)
app.use('/chat',chatRoutes)
app.use('/message',messageRoutes)




//middleware
app.use(notFound);


//listners
app.listen(port, ()=>console.log(`listening on localhost :${port}`))