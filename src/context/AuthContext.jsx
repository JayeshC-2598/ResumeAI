import React, { createContext, useEffect, useReducer, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";




export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return { user: action.payload }
        case 'RESET':
            return { user: null }
        default:
            return state;

    }
}

export default function AuthContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const AuthEvent = auth.onAuthStateChanged((currentUser) => {
            if (!state.user && currentUser) {
                if (!currentUser.emailVerified) {
                    auth.signOut();
                }
                dispatch({ type: 'SET', payload: currentUser });
                // navigate("/")
            } else {
                navigate("/login");
            }
            setLoading(false);
        })
        return AuthEvent;
    }, [])


    return (
        <AuthContext.Provider value={{ ...state, loading, dispatch }}>{children}</AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw Error("useAuthContext must be used inside an AuthContextProvider");
    return context;
}
