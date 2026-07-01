
import express from 'express';

import authUser from '../middleware/authUser.js';
import authTrainer from '../middleware/authTrainer.js';
import { getStreamToken , getStreamTokenForTrainer , getStreamTokenVideoUser , getStreamTokenVideoTrainer } from "../controllers/chat.controllers.js";

const router = express.Router();

router.get("/token", authUser , getStreamToken);
router.get("/tokenVideoUser", authUser , getStreamTokenVideoUser);

router.get("/token-for-trainer", authTrainer , getStreamTokenForTrainer);    
router.get("/tokenVideoTrainer", authTrainer , getStreamTokenVideoTrainer);

export default router;
