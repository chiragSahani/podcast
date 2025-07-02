import mongoose from "mongoose";
import Project from "../models/projectSchema.js";
import User from "../models/userSchema.js";
import File from "../models/fileSchema.js";

export const createProject = async (req, res) => {
  try {
    const { userId } = req?.decodedUser;

    //destructuring elements
    const { projectName } = req.body;

    const doc = await Project.create({
      userId: userId,
      projectName: projectName,
    });

    res.status(200).json({ success: true, message: "project created", doc });
  } catch (error) {
    console.error(`Error in project controlller :`, error);
    throw new Error(`Failed in project Controller: ${error.message}`);
  }
};

// fetching projects
export const fetchProjects = async (req, res) => {
  try {
    const { userId } = req?.decodedUser;

    const projectData = await Project.find({
      userId: userId,
    });

    res
      .status(200)
      .json({ success: true, message: "project fetched", data: projectData });
  } catch (error) {
    console.error(`Error in project controlller :`, error);
    throw new Error(`Failed in project Controller: ${error.message}`);
  }
};

// fetching projects
export const fetchProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const projectData = await Project.findOne({
      _id: projectId,
    });

    res
      .status(200)
      .json({ success: true, message: "project fetched", data: projectData });
  } catch (error) {
    console.error(`Error in project controlller :`, error);
    throw new Error(`Failed in project Controller: ${error.message}`);
  }
};

//upload file
export const createFile = async (req, res) => {
  try {
    const { userId } = req?.decodedUser;
    const { projectId } = req.params;
    const { fileName, fileDescription } = req.body;

    const doc = await File.create({
      userId: userId,
      projectId: projectId,
      fileName,
      fileDescription,
    });

    res.status(200).json({ success: true, message: "file created", doc });
  } catch (error) {
    console.error(`Error in project controlller :`, error);
    throw new Error(`Failed in project Controller: ${error.message}`);
  }
};

// fetching files
export const fetchFiles = async (req, res) => {
  try {
    const { userId } = req?.decodedUser;
    const { projectId } = req?.params;

    const FileData = await File.find({
      projectId: projectId,
      userId,
      userId,
    });

    res
      .status(200)
      .json({ success: true, message: "files fetched", data: FileData });
  } catch (error) {
    console.error(`Error in project controlller :`, error);
    throw new Error(`Failed in project Controller: ${error.message}`);
  }
};

// fetching filee
export const fetchFile = async (req, res) => {
  try {
    const { userId } = req?.decodedUser;
    const { projectId } = req?.params;

    const FileData = await File.findOne({
      projectId: projectId,
      userId,
      userId,
    });

    res
      .status(200)
      .json({ success: true, message: "file fetched", data: FileData });
  } catch (error) {
    console.error(`Error in project controlller :`, error);
    throw new Error(`Failed in project Controller: ${error.message}`);
  }
};

//edit file
export const editFile = async (req, res) => {
  try {
    const { projectId, fileId } = req.params;
    const { fileName, fileDescription } = req.body;

    const doc = await File.updateOne(
      {
        _id: fileId,
        projectId: projectId,
      },
      {
        $set: {
          fileName,
          fileDescription,
        },
      }
    );

    res.status(200).json({ success: true, message: "file updated", doc });
  } catch (error) {
    console.error(`Error in project controlller :`, error);
    throw new Error(`Failed in project Controller: ${error.message}`);
  }
};

//delete file
export const deleteFile = async (req, res) => {
  try {
    const { projectId, fileId } = req.params;


    const doc = await File.deleteOne({
      _id: fileId,
    });


    res.status(200).json({ success: true, message: "file deleted", doc });
  } catch (error) {
    console.error(`Error in project controlller :`, error);
    throw new Error(`Failed in project Controller: ${error.message}`);
  }
};
