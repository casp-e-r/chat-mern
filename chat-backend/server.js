
// importing 

import express from 'express'
import mongoose from 'mongoose'
import { notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'


// const express = require("express")
// const mongoose = require("mongoose");
// const userRoutes = require("./routes/userRoutes");

//app configuration

const app=express();
app.use(express.json());
const port =process.env.PORT || 9000


//middleware


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
app.use(notFound)

//listners
app.listen(port, ()=>console.log(`listening on localhost :${port}`))