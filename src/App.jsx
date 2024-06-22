import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
// import ReactFlow from "./pages/ReactFlow";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { Toaster } from 'react-hot-toast';
import Flowchart from "./pages/Flowchart";
import NewOTPForm from "./pages/auth/NewOTPForm";
import Landing from "./pages/auth/Landing";


import Playground from "./pages/Playground";

function App() {
    const { user, loading } = useAuthContext();
    return (
        <div className="w-full h-full min-h-svh bg-blue-50">
            {
                loading ?
                    <div className="min-h-svh bg-slate-800 grid place-content-center text-cyan-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" width="2.5em" height="2.5em" viewBox="0 0 16 16"><path fill="currentColor" d="M2.501 8a5.5 5.5 0 1 1 5.5 5.5A.75.75 0 0 0 8 15a7 7 0 1 0-7-7a.75.75 0 0 0 1.501 0"></path></svg>
                    </div> :
                    <Routes>
                        <Route path="/" element={user ? <MainLayout /> : <Navigate to="/landing" />} >
                            <Route index element={<Home />} />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="flowchart" element={<Flowchart />} />
                            <Route path="flowchart/:thread_id" element={<Flowchart />} />
                            <Route path="playground" element={<Playground />} />
                        </Route>
                        <Route path="landing" element={user ? <Navigate to="/" /> : <Landing />} />
                        <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
                        <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
                        <Route path="new-otp" element={user ? <Navigate to="/" /> : <NewOTPForm />} />
                        <Route path="forgot-pass" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
            }
            <Toaster />
        </div>
    );
}
export default App;
