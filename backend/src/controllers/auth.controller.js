import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js";

export const getData=async(req,res)=>{
    const data=await User.find({});
    res.send(data);
}

export const signup=async (req,res)=>{
    const {email,fullName,password}=req.body;
    try {
        if(!email||!fullName||!password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length<6) return res.status(400).json({message:"Password must have 6 characters"});

        const user=await User.findOne({email});

        if(user) return res.status(400).json({message:"User Already Exists"});

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            email,
            fullName,
            password:hashedPassword
        })
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                id:newUser._id,
                email:newUser.email,
                fullName:newUser.fullName,
                password:newUser.password,
                profilePic:newUser.profilePic
            });
        }else{
            res.status(400).json({message:"Invalid User Details"});
        }

    } catch (error) {
        console.log(`Error in signup controller ${error.message}`);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid Credentials"});

        const isPassword=await bcrypt.compare(password,user.password);
        if(!isPassword) return res.status(400).json({message:"Invalid credentials"});

        generateToken(user._id,res);

        res.status(200).json({
            id:user._id,
            email:user.email,
            fullName:user.fullName,
            password:user.password,
            profilePic:user.profilePic
        });
    } catch (error) {
        console.log(`Error in Login Controller : ${error.message}`);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"LoggedOut Successfully"});
    } catch (error) {
        console.log(`Error in Logout controller : ${error.message}`);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const updateProfile=async (req,res)=>{
    const {profilePic}=req.body;
    try {
        const userId=req.user._id;
        const uploadedResponse=await cloudinary.uploader.upload(profilePic);
        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadedResponse.secure_url},{new:true})

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(`Error in updateProfile Controller : ${error.message}`);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(`Error in checkAuth controller : ${error.message}`);
        res.status(500).json({message:"Internal Server Error"});
    }
}