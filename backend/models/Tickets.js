const mongoose=require('mongoose')

const ticketSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    bugsFoundAt:{
        type:String,
    },
    status:{
        type:String,
        enum:['open','processing','resolved','closed'],
        default:'open'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date
    },
    priority:{
        type:String
    },
    assignTo:{
        type:String
    }
    
},
{
    timestamps:true
})

module.exports=mongoose.model('Ticket',ticketSchema)