import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useStorage from "../../hooks/useStorage";
import { useAuthContext } from "../../context/AuthContext";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import toast from "react-hot-toast";

function Login() {
    const { setItem } = useStorage();
    const [loading, setLoading] = useState(false);
    const { dispatch, Login } = useAuthContext();
    const [formdata, setFormdata] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const HandleChange = (e) =>
        setFormdata((preState) => ({
            ...preState,
            [e.target.name]: e.target.value,
        }));
    const HandleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formdata);
        Login(formdata)
        .then((resp) => {
            console.log(resp);
            navigate("/");
            toast.success(resp.data.message);
        })
        .catch((error) => {
            console.error(error)
            toast.error("wrong username or password")
        })
        .finally(()=> setLoading(false))
        // signInWithEmailAndPassword(
        //     auth,
        //     formdata.email,
        //     formdata.password
        // )
        //     .then((response) => {
        //         if (!response.user.emailVerified) {
        //             signOut(auth);
        //             toast.error(
        //                 "Please check your email for account verification."
        //             );
        //             dispatch({ type: "RESET" });
        //         } else {
        //             setItem("user", response.user);
        //             dispatch({
        //                 type: "SET",
        //                 payload: response.user,
        //             });
        //             navigate("/");
        //             toast.success("Login successfull..");
        //         }
        //     })
        //     .catch((error) => {
        //         const errorMessage = error.message;
        //         toast.error(errorMessage);
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });
    };
    const CheckDesabled = formdata.username == "" || formdata.password == "";
    return (
        <section className="bg-blue-50">
            <div className=" flex flex-col items-center justify-end sm:justify-center px-6 py-8 mx-auto h-svh md:h-dvh lg:py-0">
                {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 -dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </a> */}
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            action="#"
                            onSubmit={HandleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Your
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2"
                                    placeholder="name@company.com"
                                    required=""
                                    onChange={
                                        HandleChange
                                    }
                                    value={
                                        formdata.username
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2"
                                    required=""
                                    onChange={
                                        HandleChange
                                    }
                                    value={
                                        formdata.password
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-end">
                                {/* TODO */}
                                {/* <Link
                                    to="/forgot-pass"
                                    className="text-sm font-medium text-blue-600 hover:underline"
                                >
                                    Forgot
                                    password?
                                </Link> */}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-300 disabled:cursor-not-allowed"
                                disabled={
                                    CheckDesabled ||
                                    loading
                                }
                            >
                                {loading ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        className="w-8 h-4 mx-auto"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx={
                                                24
                                            }
                                            cy={
                                                12
                                            }
                                            r={
                                                0
                                            }
                                            fill="currentColor"
                                        >
                                            <animate
                                                attributeName="r"
                                                begin={
                                                    0.67
                                                }
                                                calcMode="spline"
                                                dur="1.5s"
                                                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                repeatCount="indefinite"
                                                values="0;5;0;0"
                                            ></animate>
                                        </circle>
                                        <circle
                                            cx={
                                                12
                                            }
                                            cy={
                                                12
                                            }
                                            r={
                                                0
                                            }
                                            fill="currentColor"
                                        >
                                            <animate
                                                attributeName="r"
                                                begin={
                                                    0.33
                                                }
                                                calcMode="spline"
                                                dur="1.5s"
                                                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                repeatCount="indefinite"
                                                values="0;5;0;0"
                                            ></animate>
                                        </circle>
                                        <circle
                                            cx={
                                                0
                                            }
                                            cy={
                                                12
                                            }
                                            r={
                                                0
                                            }
                                            fill="currentColor"
                                        >
                                            <animate
                                                attributeName="r"
                                                begin={
                                                    0
                                                }
                                                calcMode="spline"
                                                dur="1.5s"
                                                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                                repeatCount="indefinite"
                                                values="0;5;0;0"
                                            ></animate>
                                        </circle>
                                    </svg>
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Don't have an
                                account yet?{" "}
                                <Link
                                    to="../register"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
