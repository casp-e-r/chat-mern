import mongoose, { Mongoose } from 'mongoose'
// const mongoose = require("mongoose")

const chatModel=mongoose.Schema({
    chatName: {type:String,trim:true},
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref="user"
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref="message"
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref="user"
    },
},{
    timestamps:true,
}
)
const chat=mongoose.model('chat',chatModel)
export default chat
// module.exports=chat
    
    