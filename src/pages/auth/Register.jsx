import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useStorage from '../../hooks/useStorage';
import { useAuthContext } from '../../context/AuthContext';
import ValidateOTP from '../../components/auth/ValidateOTP';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '../../config/firebase-config';
import toast from "react-hot-toast";

const ToastComponent = (t) => <div
    className={`${t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
>
    <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
                <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                    alt=""
                />
            </div>
            <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                    Emilia Gates
                </p>
                <p className="mt-1 text-sm text-gray-500">
                    Sure! 8:30pm works great!
                </p>
            </div>
        </div>
    </div>
    <div className="flex border-l border-gray-200">
        <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            Close
        </button>
    </div>
</div>




function Register() {
    const { setItem } = useStorage()
    const { dispatch } = useAuthContext();
    const [openOTP, setOpenOTP] = useState(false);
    const [formdata, setFormdata] = useState({
        email: '', password: '', confpassword: '', terms: false
    });
    const navigate = useNavigate();
    const HandleChange = (e) => setFormdata(preState => ({ ...preState, [e.target.name]: e.target.value }))
    const HandleClick = (e) => setFormdata(preState => ({ ...preState, [e.target.name]: e.target.checked }))

    const HandleSubmit = (e) => {
        e.preventDefault();
        // setOpenOTP(true);
        createUserWithEmailAndPassword(auth, formdata.email, formdata.password)
            .then(async (response) => {
                // toast.success("Please check your email")
                sendEmailVerification(auth.currentUser)
                    .then((_) => toast.success('Please check your email for account verification.'));
                console.log(response);
            }).catch((error) => {
                toast.error(error.message);
                console.log(error.message);
            })
    }
    const Submit = () => {
        setItem('user', formdata);
        dispatch({ type: 'SET', payload: formdata });
        navigate('/');
    }
    const CheckDesabled = formdata.email == '' || formdata.password == '' || formdata.confpassword == '' || formdata.password !== formdata.confpassword || formdata.password.length < 6 || !formdata.terms;
    return (
        <section className="bg-blue-50">
            <div className="flex flex-col items-center justify-end sm:justify-center px-6 py-8 mx-auto h-svh md:h-dvh lg:py-0">
                {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 -dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </a> */}
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create a new account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={HandleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2" placeholder="name@company.com" required="" onChange={HandleChange} value={formdata.email} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" id="password" placeholder="minimum 6 char" className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2" required="" onChange={HandleChange} value={formdata.password} />
                            </div>
                            <div>
                                <label htmlFor="confpassword" className="block mb-2 text-sm font-medium text-gray-900">Repeat password</label>
                                <input type="password" name="confpassword" id="confpassword" placeholder="••••••••" className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2" required="" onChange={HandleChange} value={formdata.confpassword} />
                            </div>
                            <div className="flex items-start mb-5">
                                <div className="flex items-center h-5">
                                    <input id="terms" name="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required checked={formdata.terms} onChange={HandleClick} />
                                </div>
                                <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900">I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a></label>
                            </div>
                            <div className="-flex items-center justify-between hidden">
                                <Link to="/forgot-pass" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={CheckDesabled}>Sign Up</button>
                            <p className="text-sm font-light text-gray-500">
                                Have an account? <Link to="../login" className="font-medium text-blue-600 hover:underline">Sign In</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            {openOTP && <ValidateOTP Submit={Submit} />}
        </section>
    )
}

export default Register