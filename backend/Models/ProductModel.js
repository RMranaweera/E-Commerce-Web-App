const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please Enter product name'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Please Enter description :'],
        trim:true
    },
    price:{
        type:Number,
        required:[true,'Please Enter Price :'],
    },
    discount:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        required:[true,'Please Enter product stock :'],
        default:1     
    },
    images:{
        //{
            id:{type:String},
            url:{type:String}
       // }
    },
    category:{
        type:String,
        ref:"category",
        required:{true:'please select a category: '}
    },
    brand:{
        type:String,
        ref:"category",
        required:{true:'please select a brand : '}
    },
    store:{
        type:String,
        ref:"category",
        required:[true,'please select a store : ']
    },
    localshipmentpolicy:{
        type:String,
        required:[true,'please select a policy : '],
        default:'standard',
        enum:['free','standard','custom']
    },
    customLocalShipmentPolicy:{
        type:Number
    },
    internationalshipmementpolicy:{
        type:String,
        required:[true,'please select a policy : '],
        default:'standard',
        enum:['free','standard','custom']
    },
    customInternationalShipmentPolicy:{
        type:Number
    },
    weight:{
        type:Number,default:1
    },
    raiting:{
        type:Number,default:0
    },
    numOfReveiws:{
        type:Number,default:0
    },
    reveiws:[{
        user:
        {
            type:String,
            ref: "user",
            required:true
        }
    }],
    addedBy:{
        user:{
            type:String,
            ref: "user",
            required:true       
        }
    },
    updatedBy:{
        user:{
            type:String,
            ref: "user",
            required:true       
        }
    },
},
{
    timestamps:true
}
)
module.exports=mongoose.model("product",productSchema);