import mongoose from 'mongoose';
import dotenv from 'dotenv'

// Initializing the environment configurations required for the project
dotenv.config();

//connecting mongodb
mongoose.connect(String(process.env.MONGO_URI))
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Failed to connect", err);
  });

export default mongoose;
