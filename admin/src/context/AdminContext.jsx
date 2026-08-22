import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const rawUrl = import.meta.env.VITE_BACKEND_URL || "https://fitnesstrainer-cf9v.onrender.com";
    const backendUrl = rawUrl.trim().replace(/\/+$/, '');

    const [aToken, setAToken] = useState(
        localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
    );

    const [appointments, setAppointments] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [dashData, setDashData] = useState(false)

    const getAllTrainers = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/all-trainers",
                {},
                { headers: { aToken } }
            );

            if (data.success) {
                setTrainers(data.trainers);
                console.log(data.trainers);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching trainers:", error);
            toast.error(error.message);
        }
    };

    // Function to change trainer availability using API
    const changeAvailability = async (trainerId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/change-availability",
                { trainerId },
                { headers: { aToken } }
            );
            if (data.success) {
                toast.success(data.message);
                getAllTrainers();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Function to remove trainer by the admin 
    const handleRemoveTrainer = async (trainerId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/remove-trainer",
                { trainerId },
                { headers: { aToken } }
            );

            if (data.success) {
                toast.success(data.message);
                getAllTrainers();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // Getting all session data from Database using API
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
                headers: { aToken },
            });
            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    // Function to cancel session using API
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/cancel-appointment",
                { appointmentId },
                { headers: { aToken } }
            );

            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

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
        aToken, setAToken,
        trainers,
        getAllTrainers,
        changeAvailability,
        appointments,
        getAllAppointments,
        getDashData,
        cancelAppointment,
        dashData,
        handleRemoveTrainer
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
