import React from 'react';

function ValidateOTP({ Submit }) {
    return (
        <div className='fixed w-full top-0 left-0 h-full'>
            <div className='relative w-full h-full flex justify-center text-slate-800 items-center bg-slate-800/50'>
                {/* <div className='overlay- absolute w-full h-full top-0 left-0'></div> */}
                <div className='w-full max-w-sm p-5 py-12 rounded-md bg-white shadow-md'>
                    <div className='mb-3'>
                        <h2 className='text-lg font-semibold text-center mb-2'>OTP Verification</h2>
                        <p className='text-center text-sm'>Please provide 4 digit OTP<br />share with given email</p>
                    </div>
                    <div className='mx-12'>
                        <input className='px-3 py-2 outline-none ring-1 focus:ring-2 rounded-lg max-w-full ring-gray-300 focus:ring-blue-400 text-center w-full' placeholder='OTP' />
                    </div>
                    <p className='text-xs text-center mt-2 mb-5'>Didnt receive the OTP? <span className='text-blue-600 underline'>Resent OTP</span></p>
                    <div className='px-12'>
                        <button className='bg-blue-500 py-2 rounded-lg text-white w-full' onClick={() => Submit()}>
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ValidateOTP