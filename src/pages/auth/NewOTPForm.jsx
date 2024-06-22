import React, { useState } from 'react'

function NewOTPForm() {
    const [formdata, setFormdata] = useState({
        email: '', username: '', password: '', confpassword: '', terms: false, otp: ''
    });

  return (
    <div className='bg-blue-50'>
        <div className='flex sm:justify-center items-start sm:items-center p-3 sm:p-5 min-h-svh '>
            <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
            <div className="p-5 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create a new account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={()=>null}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email Id</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2" placeholder="name@company.com" required="" onChange={HandleChange} value={formdata.email} />
                            </div>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                <input type="text" name="username" id="username" className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2" placeholder="name@company.com" required="" onChange={HandleChange} value={formdata.username} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" id="password" placeholder="minimum 6 char" className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2" required="" onChange={HandleChange} value={formdata.password} />
                            </div>
                            <div>
                                <label htmlFor="confpassword" className="block mb-2 text-sm font-medium text-gray-900">Repeat password</label>
                                <input type="password" name="confpassword" id="confpassword" placeholder="••••••••" className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2" required="" onChange={HandleChange} value={formdata.confpassword} />
                                {(formdata.confpassword !== "" && formdata.confpassword != formdata.password) && <small className='text-red-500 text-xs'>Password is not matching</small>}
                            </div>
                            {/* <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={CheckDesabled}>Get OTP</button>
                            <div>
                                <label htmlFor="OTP" className="block mb-2 text-sm font-medium text-gray-900">OTP</label>
                                <input type="text" name="OTP" id="OTP" placeholder="Please enter your OTP " className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2" required="" onChange={HandleChange} value={formdata.confpassword} />
                            </div> */}
                            <div className="flex items-start mb-5">
                                <div className="flex items-center h-5">
                                    <input id="terms" name="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required checked={formdata.terms} onChange={HandleClick} />
                                </div>
                                <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900">I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a></label>
                            </div>
                            <div className="-flex items-center justify-between hidden">
                                {/* TODO */}
                                <Link to="/forgot-pass" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={CheckDesabled}>{
                                loading ? "Loading..." : "Sign Up"
                            }</button>
                            <p className="text-sm font-light text-gray-500">
                                Have an account? <Link to="../login" className="font-medium text-blue-600 hover:underline">Sign In</Link>
                            </p>
                        </form>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default NewOTPForm