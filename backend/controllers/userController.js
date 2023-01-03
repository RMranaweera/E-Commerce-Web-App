const ErrorHandler=require('../utils/errorHandler');
const asyncHandler=require('express-async-handler');
const User=require('../models/userModel');
//const Order=require('../models/orderModel');
//const Product=require('../models/productModel');
//const Store =require('../models/storeModel');
const {getAccessToken,getRefreshToken}=require('../utils/getTokens');
const {sendUser}=require('../utils/sendUser');
const jwt=require('jsonwebtoken');
//const {saveImages,removeFiles}=require('../utils/processImages');

const cookieOption={httpOnly:true,secure:true,sameSite:'None',maxAge:24*60*60*1000};
//const cookieOption={httpOnly:true};


exports.registerUser=asyncHandler(async(req,res,next)=>{
    
    const {email, name, password}=req.body;
    let user=await User.findOne({email}).exec();
    if(user) return next(new ErrorHandler('This email is already used. You can login or use other email to register.',409));
    user=await User.create({email,name,password});
    // if(user){
    //     const path=`avatar/${user._id}`;        
    //     const userAvatar=await saveImages(req.files,path);
    //     user.avatar={url:userAvatar[0]};
    //     await user.save();
        res.status(201).json({success:true,user});
    }
//}
)

exports.loginUser=asyncHandler(async(req,res,next)=>{
    const cookies=req.cookies;
    const {email, password}=req.body;
    if(!email || !password) return next(new ErrorHandler('Please enter email & password',400));
    let user=await User.findOne({email}).select('+password');
    if(!user)  return next(new ErrorHandler('Invalid email or password',404));
    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password',404));
    }else{
        const accessToken=getAccessToken(user);
        const newRefreshToken=getRefreshToken(user);

         let newRefreshTokenArray=!cookies?.jwt?user.refreshToken:user.refreshToken.filter(rt=>rt !==cookies.jwt);

         if(cookies?.jwt){
             const refreshToken=cookies.jwt;
             const foundToken=await User.findOne({refreshToken}).exec();

             if(!foundToken){
                 console.log('attempted refresh token reuse at login');
                 newRefreshTokenArray=[];
             }

             res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true});
         }
        user.refreshToken=[...newRefreshTokenArray,newRefreshToken];
        await user.save();
     res.cookie('jwt',newRefreshToken,cookieOption);
     res.status(200).json({success: true,accessToken,user:sendUser(user)});
    }
    })

    exports.logout=asyncHandler(async(req,res,next)=>{
        const cookies=req.cookies;    
        if(!cookies?.jwt) return res.status(200).json({success:true,message:'Logged out'});
        const refreshToken=cookies.jwt;
        const user=await User.findOne({refreshToken}).exec();
        if(!user){
            res.clearCookie('jwt',{httpOnly:true});
            return res.status(200).json({success:true,message:'Logged out'});
        }
        user.refreshToken=user.refreshToken.filter(rt=>rt!==refreshToken);
        await user.save();
    
        res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true});
        res.status(200).json({success:true,message:'Logged out'});
    }) 

    exports.updatePassword=asyncHandler(async(req,res,next)=>{

        const {oldPassword,newPassword}=req.body;
        if(!oldPassword || !newPassword) return next(new ErrorHandler('Please enter old & new password',400));
    
        const user=await User.findById(req.userInfo.userId).select('+password');
        const isPasswordMatched=await user.comparePassword(oldPassword);
        if(!isPasswordMatched) return next(new ErrorHandler('Old password is incorrect',400));
    
        //user.password=newPassword;
        await user.save({password:newPassword});
    
        res.status(200).json({success:true});
    })

    
    


