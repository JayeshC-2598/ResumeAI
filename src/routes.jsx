import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import { Navigate } from "react-router-dom";

export const routes = createBrowserRouter([
    {
        path: '/',
        index: true,
        element: <Home />
    },
    {
        path: 'signin',
        element: <Signin />
    },
    {
        path: '*',
        element: <Navigate to={"/"} />
    },
])