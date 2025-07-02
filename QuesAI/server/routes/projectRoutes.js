import express from 'express';
import  verifyUserAuth  from '..//utils/middleware/verifyUserAuth.js';
import { createProject , fetchProjects , fetchProject , createFile , fetchFiles , fetchFile , editFile , deleteFile } from  '../controller/projectController.js'

const router = express.Router();

//create project
router.post('/create',verifyUserAuth,createProject)
router.get('/',verifyUserAuth,fetchProjects)
router.get('/:projectId',verifyUserAuth,fetchProject)

//project/files 
router.post('/file/:projectId',verifyUserAuth,createFile)
router.get('/files/:projectId',verifyUserAuth,fetchFiles)
router.get('/file/:projectId',verifyUserAuth,fetchFile)
router.put('/:projectId/file/:fileId/update-transcript',verifyUserAuth,editFile)
router.delete('/:projectId/file/:fileId',verifyUserAuth,deleteFile)


export default router;