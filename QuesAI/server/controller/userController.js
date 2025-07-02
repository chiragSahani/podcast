import User from "../models/userSchema.js"



export const fetchUser = async (req, res) => {
    try {
      const { userId } = req?.decodedUser;
      const data = await User.findOne({ _id : userId })
      
      res.status(201).json({ success: true, message: "User fetched", data });
    } catch (error) {
      console.error(`Error in user controller:`, error);
      throw new Error(`Failed in user Controller: ${error.message}`);
    }
  };
  


export const updateUser = async (req, res) => {
    try {
      const { userId } = req?.decodedUser;
      const { userName , profilePic } = req.body
      
      await User.updateOne({ _id : userId},{
        $set:{
            userName,
            profilePic
        }
      })

      res.status(201).json({ success: true, message: "User updated" });
    } catch (error) {
      console.error(`Error in user controller:`, error);
      throw new Error(`Failed in user Controller: ${error.message}`);
    }
  };
  