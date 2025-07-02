import User from "../models/userSchema.js";
import File from "../models/fileSchema.js";
import Project from "../models/projectSchema.js";
import Widget from "../models/widgetSchema.js"



export const createWidgetConfig = async (req, res) => {
    try {
      const { userId } = req?.decodedUser;
      const { projectId } = req.params;
  
      const existingWidget = await Widget.findOne({ projectId, userId });
  
      let doc;
      if (existingWidget) {
        doc = await Widget.findByIdAndUpdate(existingWidget._id, req.body, { new: true });
      } else {
        doc = await Widget.create({ ...req.body, projectId, userId });
      }
  
      res.status(201).json({ success: true, message: "Widget configured", doc });
    } catch (error) {
      console.error(`Error in widget controller:`, error);
      throw new Error(`Failed in widget Controller: ${error.message}`);
    }
  };
  