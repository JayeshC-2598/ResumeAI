import React from 'react';
// import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import MenuButton from './MenuButton';



const Navbar = () => {
    return (
        <header className="font-inter text-slate-700">
            <div className="px-5">
                <nav className="h-16 w-full flex items-center justify-between">
                    <Link
                        to="/"
                        className="font-bold tracking-wider group text-lg"
                    >
                        Flowchart
                        <span className="text-blue-500 transition-colors group-hover:text-blue-600 group-hover:outline-dashed outline-1">
                            AI
                        </span>
                    </Link>
                    {/* <button className="outline-none rounded-full shadow-lg p-2 bg-white hover:scale-105 hover:shadow-md transition-all active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>

                    </button> */}
                    <MenuButton />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;