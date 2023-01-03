const mongoose = require('mongoose');
  
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please Enter Category Name,'],
        trim:true,
        unique:[true,'This category is exists.']
    },
    description:{
        type:String,
        required:[true,'Please Enter Category Description.']
    },

    addedBy:{
        //type:mongoose.Schema.ObjectID,
        type:String,
        ref:"User",
        //required:true
    },

    updatedBy:{
       // type:mongoose.Schema.ObjectID,
       type:String,
        ref:"User",
        //required:true
    },
    discontinued:{Boolean,default:false}
},
{timestamps:true}
)


module.exports=mongoose.model("Category",categorySchema);