import express from 'express';
import  verifyUserAuth  from '..//utils/middleware/verifyUserAuth.js';
import {  createWidgetConfig  } from  '../controller/widgetController.js'

const router = express.Router();

router.post('/display/:projectId',verifyUserAuth,createWidgetConfig)

export default router;