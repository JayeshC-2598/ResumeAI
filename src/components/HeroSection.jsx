import React from 'react';
// import { LuFilePlus } from "react-icons/lu";
// import { LuFileUp } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useDocumentsContext } from '../context/DocumentsContext';

const HeroSection = () => {
    const { user } = useAuthContext();
    const {ResetConversation} = useDocumentsContext()
    const navigate = useNavigate();

    const HandleNavigate = () => {
        ResetConversation()
        navigate("/flowchart");
    }

    return (
        <div className="font-inter">
            <div className="px-5">
                <div className="py-12 flex flex-col h-96 justify-center">
                    <h3 className="text-center text-2xl font-light text-slate-700 mb-2">
                        Welcome,{" "}
                        <span className="font-medium overflow-ellipsis w-full max-w-full">{user.username.split("@")[0] || 'Guest!'}</span>{" "}
                        <span className="font-noto">
                            👋
                        </span>
                    </h3>
                    <h1 className='text-center text-slate-700 text-5xl font-extrabold'>Create new</h1>

                    <div className="mt-5 mx-auto w-full max-w-sm p-5 text-sm text-white flex justify-center gap-5 flex-wrap">
                        <button onClick={() => HandleNavigate()} className="w-full flex-auto md:flex-1 text-xl text-center rounded-lg bg-sky-600 p-3 md:p-4 px-6 hover:bg-sky-500 transition-colors">
                            Create
                        </button>
                        {/* <button className="w-full flex-auto md:flex-1 text-xl text-center rounded-lg bg-sky-600 p-3 md:p-4 px-6 hover:bg-sky-500 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={true}>
                            Coverletter
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection