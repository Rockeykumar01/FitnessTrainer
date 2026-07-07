import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // this is the base URL for the backend API, which is retrieved from environment variables. It allows the frontend to make requests to the backend server for various operations like fetching trainers, user data, etc. and this is used to ensure that the frontend can communicate with the backend regardless of the deployment environment (development, staging, production). its used in axios requests to make API calls to the backend server. so that the frontend can interact with the backend services for data retrieval and manipulation. and this is used in the context provider to make API calls to the backend server for various operations like fetching trainers, user data, etc. and this is used to ensure that the frontend can communicate with the backend regardless of the deployment environment (development, staging, production). its used in axios requests to make API calls to the backend server to interact with the backend services for data retrieval and manipulation.
    const [trainers, setTrainers] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    // here token is a state variable that holds the authentication token for the user. It is initialized by checking if there is a token stored in the local storage of the browser. If a token exists, it is retrieved and set as the initial state; otherwise, an empty string is used. This token is used for authenticating API requests to the backend server, allowing the frontend to access protected routes and user-specific data. The setToken function allows updating this token state when the user logs in or logs out, ensuring that the application can manage user sessions effectively.
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

// it is a context provider component that provides application-wide state and functions related to trainers, user authentication, and email verification. It uses React's Context API to share state across the application.