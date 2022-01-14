import mongoose from 'mongoose'
// const mongoose = require("mongoose")

const userModal=mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    picture: {type:String},
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
},{
    timestamps:true,
})
const User = mongoose.model('user',userModal)
export default User
// module.exports =User