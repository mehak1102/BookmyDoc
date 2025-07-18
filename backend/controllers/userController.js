import validator from 'validator'
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'


//api to registe ruser
const registerUser = async(req,res) => {
    try {
        const {name,email,password} = req.body

        if (!name || !password || !email) {
            return res.json({success:false,message:"Missing Details"})
        }
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"Enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success:false,message:"Enter a strong password"})

        }
       //hasing user pass 
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt)

       const userData = {
        name,
        email,
        password:hashedPassword
       }
     const newUser = new userModel(userData)
     const user = await newUser.save()
   
      const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

      res.json ({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})      
    }
}

//api fr user login

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        
        if(!user) {
         return res.json({success:false,message:'User does not exist'})  
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})  
    }
}

const getProfile = async (req,res) => {
    try {
      const userId = req.user.userId;
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true,userData})
    } catch (error) {
          console.log(error);
        res.json({success:false,message:error.message})  
        
    }
}

//apin to update
// const updateProfile = async (req,res) => {
//     try {
//         const {userId,name,phone,address,dob,gender} = req.body
//         const imageFile = req.file
//         if(!name || !phone || !dob || !gender) {
//          return res.json({success:false,message:"Data Missing"})
//         }
//         await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

//         if (imageFile) {
//             //upload img to cloudinary
//             const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
//             const imageURL = imageUpload.secure_url

//             await userModel.findByIdAndUpdate(userId,{image:imageURL})
//         }
//         res.json({success:true,message:"Profile Updated"})
//     } catch (error) {
//          console.log(error);
//         res.json({success:false,message:error.message})      
//     }
// }
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ get from req, not body
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    let parsedAddress = address;
    if (typeof address === 'string') {
      try {
        parsedAddress = JSON.parse(address);
      } catch {
        return res.json({ success: false, message: "Invalid address format" });
      }
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, phone, dob, gender, address: parsedAddress },
      { new: true }
    );

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image',
      });
      updatedUser.image = imageUpload.secure_url;
      await updatedUser.save();
    }

    res.json({ success: true, message: "Profile Updated" });

  } catch (error) {
    console.log("Update Error:", error);
    res.json({ success: false, message: error.message });
  }
}


export {registerUser , loginUser, getProfile , updateProfile} 

