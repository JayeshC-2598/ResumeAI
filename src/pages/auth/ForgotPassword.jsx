import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase-config';
import { sendPasswordResetEmail } from "firebase/auth";

import Swal from 'sweetalert2'

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const HandleSubmit = (e) => {
        e.preventDefault();
        console.log(email, e);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Swal.fire({
                    title: "Successful",
                    text: "Please check your email for password reset email.",
                    icon: "success"
                });
            });
    }
    return (
        <section className="bg-blue-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh_-_4em)] lg:py-0">
                {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 -dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </a> */}
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Forgotten your password ?
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={HandleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2" placeholder="name@company.com" required="" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <p className='text-sm text-slate-700'>
                                    If the address provided is the one associated with your account, then you will receive a Password Reset email soon.
                                </p>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-300 disabled:cursor-not-allowed">Reset Password</button>
                            <p className="text-sm font-light text-gray-500">
                                Remember your password ! <Link to="../login" className="font-medium text-blue-600 hover:underline">Sign in here.</Link>
                                <br />
                                Don't have an account yet? <Link to="../register" className="font-medium text-blue-600 hover:underline">Sign up</Link>
                            </p>
                            {/* <p className="text-sm font-light text-gray-500">
                            </p> */}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword