import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSideBar=async (req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log(`Error in getUsersForSideBar Controller : ${error.message}`);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const getMessages=async (req,res)=>{
    try {
        const {id:contactUserId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId,recieverId:contactUserId},
                {senderId:contactUserId,recieverId:myId},
            ],
        });
        res.status(200).json(messages)
    } catch (error) {
        console.log(`Error in getMessages Controller : ${error.message}`);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const sendMessage=async (req,res)=>{
    const {text,image}=req.body;
    try {
        const {id:recieverId}=req.params;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const uploadedResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadedResponse.secure_url;
        };
        
        const newMessage=new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl
        });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.log(`Error in sendMessage Controller : ${error.message}`);
        res.status(500).json({message:"Internal Server Error"});
    }
}