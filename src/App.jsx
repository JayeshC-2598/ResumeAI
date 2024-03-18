import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import MainLayout from "./layout/MainLayout";
import Resume from "./pages/Resume";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Result from "./pages/Result";
import { Toaster } from 'react-hot-toast';
import Editor from "./pages/Editor";
// import { useDocumentsContext } from "./context/DocumentsContext";

// import { routes } from "./routes";




function App() {
    const { user, loading } = useAuthContext();
    // const { initDocuments } = useDocumentsContext();
    // const { payed } = useMarkdownContext();

    // useEffect(() => {
    //     console.log(user);
    //     initDocuments(user.uid);
    // }, [])
    return (
        <div className="w-full min-h-svh -font-inter bg-blue-50">
            {
                loading ?
                    <div className="min-h-svh bg-slate-800 grid place-content-center text-cyan-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" width="2.5em" height="2.5em" viewBox="0 0 16 16"><path fill="currentColor" d="M2.501 8a5.5 5.5 0 1 1 5.5 5.5A.75.75 0 0 0 8 15a7 7 0 1 0-7-7a.75.75 0 0 0 1.501 0"></path></svg>
                    </div> :
                    <Routes>
                        <Route path="/" element={user ? <MainLayout /> : <Navigate to="/login" />} >
                            <Route index element={<Home />} />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="resume" element={<Resume />} />
                            <Route path="result/:did" element={<Result />} />
                            {/* <Route path="editor" element={<Editor />} /> */}
                        </Route>
                        <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
                        <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
                        <Route path="forgot-pass" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
                    </Routes>
            }
            <Toaster />
        </div>
    );
}
export default App;
