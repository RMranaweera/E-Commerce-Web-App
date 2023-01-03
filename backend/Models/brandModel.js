const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please Enter Brand Name,'],
        trim:true,
        unique:[true,'This Brand is exists.']
    },
    description:{
        type:String,
        required:[true,'Please Enter Brand Description.']
    },
    addedBy:{
        type:String,
        ref:"User",
        //required:true
    },
    updatedBy:{
        type:String,
        ref:"User",
       // required:true
    },
    discontinued:{Boolean,default:false}
},
{timestamps:true}
)

module.exports=mongoose.model("Brand",brandSchema);