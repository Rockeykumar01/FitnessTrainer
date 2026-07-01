import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },    // Training type e.g. Weight Training, Yoga
    degree: { type: String, required: true },         // Certification e.g. CSCS, RYT-500
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },      // Stores booked session slots per date
    address: { type: Object, required: true },
    date: { type: Number, required: true },
}, { minimize: false })

const trainerModel = mongoose.models.trainer || mongoose.model("trainer", trainerSchema);
export default trainerModel;
