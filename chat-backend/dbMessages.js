import mongoose from 'mongoose'

const chatSchema=mongoose.Schema({
    message: String,
    name: String,
    timestamp: String
})