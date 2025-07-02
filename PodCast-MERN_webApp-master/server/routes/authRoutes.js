import express from 'express';
import  verifyUserAuth  from '..//utils/middleware/verifyUserAuth.js';
import {  authCheck , login  } from  '../controller/authController.js'

const router = express.Router();

router.post('/login',login)
router.get('/check-auth',verifyUserAuth,authCheck)

export default router;