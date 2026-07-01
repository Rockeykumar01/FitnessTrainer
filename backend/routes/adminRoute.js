import express from 'express'
import { addTrainer, allTrainers, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashboard } from '../controllers/adminController.js'
import { changeAvailability, removeTrainer } from '../controllers/trainerController.js';
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-trainer", authAdmin, upload.single('image'), addTrainer)
adminRouter.post("/all-trainers", authAdmin, allTrainers)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/change-availability", authAdmin, changeAvailability)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/dashboard", authAdmin, adminDashboard)
adminRouter.post("/remove-trainer", authAdmin, removeTrainer)

export default adminRouter
