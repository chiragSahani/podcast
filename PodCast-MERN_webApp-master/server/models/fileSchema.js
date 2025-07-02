import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    projectId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Project', 
      required: true 
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    fileName: { 
      type: String, 
      required: true 
    },
    fileDescription: { 
      type: String 
    },
    status: { 
      type: String, 
      default: 'done' 
    }
  },
  { 
    timestamps: true 
  }
);

const File = mongoose.model('File', fileSchema);

export default File;
