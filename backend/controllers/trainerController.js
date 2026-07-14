import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import trainerModel from "../models/trainerModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API to change trainer availability for Admin and Trainer Panel
const changeAvailability = async (req, res) => {
    try {
        const { trainerId } = req.body
        const trainerData = await trainerModel.findById(trainerId)
        await trainerModel.findByIdAndUpdate(trainerId, { available: !trainerData.available })
        res.json({ success: true, message: 'Availability Changed' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to remove trainer by the admin
const removeTrainer = async (req, res) => {
    try {
        console.log("Received remove-trainer POST request");
        const { trainerId } = req.body
        await trainerModel.findByIdAndDelete(trainerId)
        res.json({ success: true, message: 'Trainer Removed' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all trainers list for Frontend
const trainerList = async (req, res) => {
    try {
        const trainers = await trainerModel.find({}).select(['-password', '-email'])
        res.json({ success: true, trainers })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for trainer Login
const loginTrainer = async (req, res) => {
    try {
        const { email, password } = req.body
        const trainer = await trainerModel.findOne({ email })

        if (!trainer) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, trainer.password)

        if (isMatch) {
            const token = jwt.sign({ id: trainer._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get trainer sessions for trainer panel
const appointmentsTrainer = async (req, res) => {
    try {
        const { trainerId } = req.body
        const appointments = await appointmentModel.find({ docId: trainerId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel session for trainer panel
const sessionCancel = async (req, res) => {
    try {
        const { trainerId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === trainerId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            const { docId, slotDate, slotTime } = appointmentData
            const trainerData = await trainerModel.findById(docId)
            let slots_booked = trainerData.slots_booked
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
            await trainerModel.findByIdAndUpdate(docId, { slots_booked })
            return res.json({ success: true, message: 'Session Cancelled' })
        }
        return res.json({ success: false, message: 'Session Cancelled' })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// API to mark session completed for trainer panel
const sessionComplete = async (req, res) => {
    try {
        const { trainerId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === trainerId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            const { slotDate, slotTime } = appointmentData
            const trainerData = await trainerModel.findById(trainerId)
            let slots_booked = trainerData.slots_booked
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
            await trainerModel.findByIdAndUpdate(trainerId, { slots_booked })
            return res.json({ success: true, message: 'Session Completed' })
        }
        return res.json({ success: false, message: 'Session Cancelled' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for trainer panel
const trainerDashboard = async (req, res) => {
    try {
        const { trainerId } = req.body
        const appointments = await appointmentModel.find({ docId: trainerId })

        let earnings = 0
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let clients = []
        appointments.map((item) => {
            if (!clients.includes(item.userId)) {
                clients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: clients.length,
            latestAppointments: appointments.reverse().slice(0, 10)
        }

        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get trainer profile for Trainer Panel
const trainerProfile = async (req, res) => {
    try {
        const { trainerId } = req.body
        const profileData = await trainerModel.findById(trainerId).select('-password')
        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update trainer profile data from Trainer Panel
const updateTrainerProfile = async (req, res) => {
    try {
        const { trainerId, fees, address, available, about } = req.body
        await trainerModel.findByIdAndUpdate(trainerId, { fees, address, available, about })
        
        // Ensure that any existing appointments reflect the updated trainer data (like fees, address, etc.)
        const updatedTrainer = await trainerModel.findById(trainerId).select('-password');
        await appointmentModel.updateMany(
            { docId: trainerId },
            { $set: { docData: updatedTrainer.toObject() } }
        );

        res.json({ success: true, message: 'Profile Updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginTrainer,
    appointmentsTrainer,
    sessionCancel,
    trainerList,
    changeAvailability,
    sessionComplete,
    trainerDashboard,
    trainerProfile,
    updateTrainerProfile,
    removeTrainer
}
