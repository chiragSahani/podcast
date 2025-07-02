import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true }); 

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
