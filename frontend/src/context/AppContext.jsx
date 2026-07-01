import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [trainers, setTrainers] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)
    const [isVerified, setIsVerified] = useState(false);

    // Email verification
    const verifyEmail = async (code) => {
        try {
            const response = await axios.post(`${backendUrl}/api/user/verify-email`, { code });
            const { user } = response.data;

            setUserData(user);
            setIsVerified(true);
            toast.success("Email verified successfully");

            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error verifying email");
            throw error;
        }
    };

    // Getting Trainers using API
    const getTrainersData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/trainer/list");
            if (data.success) {
                setTrainers(data.trainers);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // Getting User Profile using API
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getTrainersData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
            setIsVerified(false);
        }
    }, [token]);

    const value = {
        trainers, getTrainersData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData, loadUserProfileData,
        verifyEmail,
        isVerified,
    };

    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );
};

export default AppContextProvider;
