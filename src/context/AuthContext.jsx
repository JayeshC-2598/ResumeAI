import http from "../config/axios-config";
import React, { createContext, useEffect, useReducer, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStorage from "../hooks/useStorage";
import toast from "react-hot-toast";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../config/firebase-config";




export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return { user: action.payload.user_profile, token: action.payload.token }
        case 'RESET':
            // console.log("authReducer Reset Called");
            return { user: null, token: null }
        default:
            return state;
    }
}

export default function AuthContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useReducer(authReducer, { user: null, token: null })
    const { setItem, getItem, removeItem } = useStorage();

    const [newlyRegistered, setNewlyRegistered] = useState(false);


    // const location = useLocation();
    const navigate = useNavigate();

    const setState = (details) => dispatch({ type: 'SET', payload: details })
    const resetState = () => dispatch({ type: 'RESET' })

    const Login = (credentials) => new Promise((resolve, reject) => {
        http.post("/login/", credentials)
            .then((resp) => {
                // console.log(">> >> Login", resp.data.token);
                setItem("token", resp.data.token)
                setItem("user_profile", resp.data.user_profile);
                setState({ user_profile: resp.data.user_profile, token: resp.data.token });
                resolve(resp);
            })
            .catch((error) => reject(error));
    })
    const SendOTP = (credentials) => new Promise((resolve, reject) => {
        http.post("/send-otp/", credentials)
            .then((resp) => resolve(resp))
            .catch((error) => reject(error));
    })
    const VerifyOTP = (credentials) => new Promise((resolve, reject) => {
        http.post("/verify-otp/", credentials)
            .then((resp) => {
                // console.log(resp);
                setState(resp.data);
                // Store Data
                setItem("token", resp.data.token)
                setItem("user_profile", resp.data.user_profile);

                resolve(resp);
            })
            .catch((error) => reject(error));
    });

    const Logout = () => new Promise((resolve, reject) => {
        http.post("/logout/", { "token": state.token })
            .then((response) => {
                // console.log("Logout ",response);
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.error(error);
                toast.error("Faced error while logging out");
            })
            .finally(() => {
                removeItem("token");
                removeItem("user_profile");
                resetState();
                window.location.reload();
            })
    });

    useEffect(() => {
        setLoading(true);
        const token = getItem("token");
        const user_profile = getItem("user_profile");
        if (token && user_profile) {
            const data = { user_profile: user_profile, token: token }
            setState(data);
        } else {
            navigate("/landing");
        }
        setLoading(false);
        console.log("AuthCOntext");
    }, [])

    return (
        <AuthContext.Provider value={{
            ...state,
            loading,
            dispatch,
            Login,
            SendOTP,
            VerifyOTP,
            Logout,

            newlyRegistered,
            setNewlyRegistered
        }}>{children}</AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw Error("useAuthContext must be used inside an AuthContextProvider");
    return context;
}
