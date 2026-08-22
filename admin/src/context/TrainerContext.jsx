import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TrainerContext = createContext();

const TrainerContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://fitnesstrainer-cf9v.onrender.com"
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)
        
    // Getting Trainer session data from Database using API
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/trainer/appointments', { headers: { dToken } })
            if (data.success) {
                setAppointments(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Getting Trainer profile data from Database using API
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/trainer/profile', { headers: { dToken } })
            console.log(data.profileData)
            setProfileData(data.profileData)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Cancel session
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/trainer/cancel-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    // Complete session
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/trainer/complete-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    // Getting Trainer dashboard data using API
    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/trainer/dashboard', { headers: { dToken } })
            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        dToken, setDToken, backendUrl,
        appointments, setAppointments,
        getAppointments,
        cancelAppointment,
        completeAppointment,
        dashData, setDashData, getDashData,
        profileData, setProfileData,
        getProfileData,
    }

    return (
        <TrainerContext.Provider value={value}>
            {props.children}
        </TrainerContext.Provider>
    )
}

export default TrainerContextProvider

// here is the TrainerContext.jsx file, which creates a context for managing trainer-related data and actions in a React application. It uses the Context API to provide state and functions related to trainer appointments, profile data, and dashboard data to the components that consume this context. The context includes functions for fetching appointments, canceling and completing appointments, and retrieving profile and dashboard data from the backend API. It also handles authentication tokens and error handling using toast notifications.