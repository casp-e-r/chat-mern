
// importing 
import express from 'express'
import mongoose from 'mongoose'

//app configuration

const app=express()
const port =process.env.PORT || 9000
//middleware

//db config
mongoose.connect('mongodb+srv://aswin:ynwa20@cluster0.m74b3.mongodb.net/chatDatabase?retryWrites=true&w=majority')

//????

//api routes

app.get('/',(req,res)=>{res.status(200).send('hello world')})

//listners
app.listen(port, ()=>console.log(`listening on localhost :${port}`))