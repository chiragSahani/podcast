import express from 'express';
import  verifyUserAuth  from '..//utils/middleware/verifyUserAuth.js';
import { fetchUser , updateUser } from '../controller/userController.js';

const router = express.Router();

router.get('/',verifyUserAuth,fetchUser)
router.put('/',verifyUserAuth,updateUser)

export default router;