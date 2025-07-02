//auth controller
import { generateToken } from "../utils/helperFun/generateToken.js";
import User from '../models/userSchema.js'


export const authCheck = ( req , res ) =>{
    try{
        res.status(200).json({success:true , isAuthenticated: true , user : req.decodedUser })
    }catch( error ){
        console.error(`Error in auth checking controlller :`, error);
        throw new Error(`Failed in Auth Controller: ${error.message}`);
    }
}


//login
export const login = async (req, res) => {
    try {
      const { email, userName, profilePic } = req.body;
      let user = await User.findOne({ email });
  
      // If user doesn't exist, create a new one
      if (!user) {
        const doc = await User.create({
            email , 
            userName ,
            profilePic
        })
      }

      const {_id } = await User.findOne({ email : email})
  
      // Setting the token
      const payload = {
        email: email,
        userId : _id
      };
  
      const token = generateToken(payload);
  
      res.cookie("user_jwt", token, {
        httpOnly: true,
        secure : 'none',
        sameSite: 'none', // Allows cross-site cookie access
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/', // Ensure the cookie is accessible for all paths
      });

      // Sending response
      res.status(201).json({ 
        message: "User logged in successfully", 
        success: true, 
        email : { email }
      });
  
    } catch (err) {
      console.error("Error in the auth controller:", err);
      res.status(500).json({ message: "Error in login, try again later" });
    }
  };
  

