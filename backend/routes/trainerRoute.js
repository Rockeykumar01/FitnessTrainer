import express from 'express';
import {
    trainerList,
    loginTrainer,
    appointmentsTrainer,
    sessionCancel,
    sessionComplete,
    trainerDashboard,
    trainerProfile,
    updateTrainerProfile
} from '../controllers/trainerController.js';
import authTrainer from '../middleware/authTrainer.js';

const trainerRouter = express.Router();

trainerRouter.post("/login", loginTrainer)
trainerRouter.post("/cancel-appointment", authTrainer, sessionCancel)
trainerRouter.get("/appointments", authTrainer, appointmentsTrainer)
trainerRouter.get("/list", trainerList)
trainerRouter.post("/complete-appointment", authTrainer, sessionComplete)
trainerRouter.get("/dashboard", authTrainer, trainerDashboard)
trainerRouter.get("/profile", authTrainer, trainerProfile)
trainerRouter.post("/update-profile", authTrainer, updateTrainerProfile)

export default trainerRouter;
