import React from 'react';
// import { LuFilePlus } from "react-icons/lu";
// import { LuFileUp } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const HeroSection = () => {
    const { user } = useAuthContext();
    // console.log(user);
    return (
        <div className="font-inter">
            <div className="container mx-auto px-5 max-w-7xl">
                <div className="py-12 flex flex-col h-96 justify-center">
                    <h3 className="text-center text-2xl font-light text-slate-700 mb-2">
                        Welcome,{" "}
                        <span className="font-medium">{user.email.split('@')[0] || 'Guest!'}</span>{" "}
                        <span className="font-noto">
                            👋
                        </span>
                    </h3>
                    <h1 className='text-center text-slate-700 text-5xl font-extrabold'>Create new</h1>

                    <div className="mt-5 mx-auto w-full max-w-xl p-5 text-sm text-white flex justify-center gap-5 flex-wrap">
                        <Link to={'resume'} className="w-full flex-auto md:flex-1 text-xl text-center rounded-lg bg-sky-600 p-3 md:p-4 px-6 hover:bg-sky-500 transition-colors">
                            Resume
                        </Link>
                        <button className="w-full flex-auto md:flex-1 text-xl text-center rounded-lg bg-sky-600 p-3 md:p-4 px-6 hover:bg-sky-500 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={true}>
                            Coverletter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection