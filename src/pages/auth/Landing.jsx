import React from 'react';
import { Link } from 'react-router-dom';
// import "./style.css";
// import "./../../assets/dist/css/style.css";
import HeroImage from "./../../assets/dist/img/hero-main.png";
import FlowchartImage from "./../../assets/dist/img/flowchart.png";

function Landing() {
  return (
    <div className="max-w-screen-2xl mx-auto bg-white min-h-screen overflow-hidden flex-col text-[#6F8394] shadow-xl">
        <header className="relative py-6">
            <div className="max-w-6xl mx-auto px-6">
                <div className="site-header-inner">
                    <div className="brand header-brand">
                        <h1 className="m-0">
                            <a href="#">
                                <svg width="48" height="32" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
                                    <title>Flowchart AI</title>
                                    <defs>
                                        <linearGradient x1="0%" y1="100%" y2="0%" id="logo-a">
                                            <stop stopColor="#007CFE" stopOpacity="0" offset="0%"/>
                                            <stop stopColor="#007DFF" offset="100%"/>
                                        </linearGradient>
                                        <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="logo-b">
                                            <stop stopColor="#FF4F7A" stopOpacity="0" offset="0%"/>
                                            <stop stopColor="#FF4F7A" offset="100%"/>
                                        </linearGradient>
                                    </defs>
                                    <g fill="none" fillRule="evenodd">
                                        <rect fill="url(#logo-a)" width="32" height="32" rx="16"/>
                                        <rect fill="url(#logo-b)" x="16" width="32" height="32" rx="16"/>
                                    </g>
                                </svg>
                            </a>
                        </h1>
                    </div>
                </div>
            </div>
        </header>

        <main className='flex-1'>
            <section className="text-center md:text-left pt-10 sm:pt-24 sm:pb-20 relative
                before:h-52 before:w-4/5 before:content-[''] before:absolute before:bottom-0 before:right-0 before:bg-[#2294fb] md:before:left-[600px] md:before:w-full lg:before:left-auto lg:before:w-2/5 md:before:h-[800px]
            ">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="md:flex relative">
                        <div className="hero-copy sm:min-w-[512px] md:min-w-[552px] md:pr-10 lg:pr-20">
                            <h1 className="font-semibold sm:font-bold text-[#1F2B35] text-4xl sm:text-5xl mb-4">Flowchart AI</h1>
                            <p className="mb-8 #font-medium text-base">Design, visualize, and simplify complex processes with our AI-powered flowchart builder.</p>
                            <p className="mb-6"><Link className="shadow-lg bg-gradient-to-r from-blue-500 to-blue-300 text-white px-8 py-4 font-bold rounded hover:from-pink-500 hover:to-pink-400" to={"/login"}>Try It Now</Link></p>
                        </div>
                        <div className="mt-10 pb-10 md:pb-0 md:-mt-12">
                            <img src={HeroImage} alt="0o0" width={500} className="shadow-2xl w-full max-w-80 mx-auto sm:max-w-none sm:w-[528px]" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="features section text-center relative">
                <div className="section-square sm:absolute top-0 left-0 sm:h-56 sm:w-2/5 bg-[#F6F8FA]"></div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="#features-inner #section-inner relative py-12 sm:py-20">
                        <div className="#features-wrap flex flex-wrap justify-center -mx-3">
                            <div className="#feature #is-revealing p-3 flex-0 w-64 max-w-64 grow">
                                <div className="#feature-inner bg-white h-full px-6 py-10 shadow-[0_16px_48px_#E2E8ED]">
                                    <div className="#feature-icon flex justify-center">
                                        <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="feature-1-a">
                                                    <stop stopColor="#007CFE" stopOpacity="0" offset="0%"/>
                                                    <stop stopColor="#007DFF" offset="100%"/>
                                                </linearGradient>
                                                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="feature-1-b">
                                                    <stop stopColor="#FF4F7A" stopOpacity="0" offset="0%"/>
                                                    <stop stopColor="#FF4F7A" offset="100%"/>
                                                </linearGradient>
                                            </defs>
                                            <g fill="none" fillRule="evenodd">
                                                <path d="M8 0h24v24a8 8 0 0 1-8 8H0V8a8 8 0 0 1 8-8z" fill="url(#feature-1-a)"/>
                                                <path d="M48 16v24a8 8 0 0 1-8 8H16c0-17.673 14.327-32 32-32z" fill="url(#feature-1-b)"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <h4 className="#feature-title #h3-mobile mt-3 mb-2 text-2xl text-[#1F2B35] font-medium">AI Assistance</h4>
                                    <p className="#text-sm text-base mb-6 text-pretty">Automatically organize your flowchart for optimal readability.</p>
                                </div>
                            </div>
                            <div className="#feature #is-revealing p-3 flex-0 w-64 max-w-64 grow">
                                <div className="#feature-inner bg-white h-full px-6 py-10 shadow-[0_16px_48px_#E2E8ED]">
                                    <div className="#feature-icon flex justify-center">
                                        <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="feature-2-a">
                                                    <stop stopColor="#007CFE" stopOpacity="0" offset="0%"/>
                                                    <stop stopColor="#007DFF" offset="100%"/>
                                                </linearGradient>
                                                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="feature-2-b">
                                                    <stop stopColor="#FF4F7A" stopOpacity="0" offset="0%"/>
                                                    <stop stopColor="#FF4F7A" offset="100%"/>
                                                </linearGradient>
                                            </defs>
                                            <g fill="none" fillRule="evenodd">
                                                <path d="M0 0h32v7c0 13.807-11.193 25-25 25H0V0z" fill="url(#feature-2-a)"/>
                                                <path d="M48 16v7c0 13.807-11.193 25-25 25h-7c0-17.673 14.327-32 32-32z" fill="url(#feature-2-b)" transform="matrix(1 0 0 -1 0 64)"/>
                                            </g>
                                        </svg>

                                    </div>
                                    <h4 className="#feature-title #h3-mobile mt-3 mb-2 text-2xl text-[#1F2B35] font-medium">Ease of Use</h4>
                                    <p className="#text-sm text-base mb-6 text-pretty">Intuitive design that requires no prior experience in flowchart design.</p>
                                </div>
                            </div>
                            <div className="#feature #is-revealing p-3 flex-0 w-64 max-w-64 grow">
                                <div className="#feature-inner bg-white h-full px-6 py-10 shadow-[0_16px_48px_#E2E8ED]">
                                    <div className="#feature-icon flex justify-center">
                                        <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="feature-3-a">
                                                    <stop stopColor="#007CFE" stopOpacity="0" offset="0%"/>
                                                    <stop stopColor="#007DFF" offset="100%"/>
                                                </linearGradient>
                                                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="feature-3-b">
                                                    <stop stopColor="#FF4F7A" stopOpacity="0" offset="0%"/>
                                                    <stop stopColor="#FF4F7A" offset="100%"/>
                                                </linearGradient>
                                            </defs>
                                            <g fill="none" fillRule="evenodd">
                                                <circle fill="url(#feature-3-a)" cx="16" cy="16" r="16"/>
                                                <path d="M16 16c17.673 0 32 14.327 32 32H16V16z" fill="url(#feature-3-b)"/>
                                            </g>
                                        </svg>

                                    </div>
                                    <h4 className="#feature-title #h3-mobile mt-3 mb-2 text-2xl text-[#1F2B35] font-medium">Customizability</h4>
                                    <p className="#text-sm text-base mb-6 text-pretty">Easily customize shapes, colors, and connections to fit your needs.</p>
                                </div>
                            </div>
                            <div className="#feature #is-revealing p-3 flex-0 w-64 max-w-64 grow">
                                <div className="#feature-inner bg-white h-full px-6 py-10 shadow-[0_16px_48px_#E2E8ED]">
                                    <div className="#feature-icon flex justify-center">
                                        <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="feature-4-a">
                                                    <stop stopColor="#FF4F7A" stopOpacity="0" offset="0%"/>
                                                    <stop stopColor="#FF4F7A" offset="100%"/>
                                                </linearGradient>
                                                <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="feature-4-b">
                                                    <stop stopColor="#007CFE" stopOpacity="0" offset="0%"/>
                                                    <stop stopColor="#007DFF" offset="100%"/>
                                                </linearGradient>
                                            </defs>
                                            <g fill="none" fillRule="evenodd">
                                                <path d="M32 16h16v16c0 8.837-7.163 16-16 16H16V32c0-8.837 7.163-16 16-16z" fill="url(#feature-4-a)"/>
                                                <path d="M16 0h16v16c0 8.837-7.163 16-16 16H0V16C0 7.163 7.163 0 16 0z" fill="url(#feature-4-b)"/>
                                            </g>
                                        </svg>

                                    </div>
                                    <h4 className="#feature-title #h3-mobile mt-3 mb-2 text-2xl text-[#1F2B35] font-medium">Interactive Elements</h4>
                                    <p className="#text-sm text-base mb-6 text-pretty">Elements can be moved and connected according to the user's requirements, providing a flexible and customizable flowchart creation experience.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="#pricing #section relative overflow-hidden
                before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-32 md:before:h-52 before:bg-[#1F2B35] before:overflow-hidden
            ">
                <div className="#section-square hidden sm:block sm:absolute bottom-52 right-0 h-56 w-2/5 bg-[#F6F8FA]"></div>
                <div className="#container max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="#pricing-inner relative py-10 sm:py-20
                        before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:block before:h-[1px] before:bg-[#E2E8ED]
                    ">
                        <h2 className="#section-title mb-12 sm:mb-16 font-medium text-[#1F2B35] text-4xl text-center">Dashboard</h2>
                        <div className="pricing-tables-wrap">
                            <img src={FlowchartImage} alt="dashboard look" className="#image rounded-lg sm:rounded-xl cursor-pointer shadow-lg hover:shadow-slate-200/30 transition-all hover:scale-[1.01]" />
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer className="#site-footer text-[#6F8394] bg-[#1F2B35] text-sm leading-5 tracking-normal">
            <div className="#container max-w-6xl mx-auto px-4 sm:px-6">
                <div className="#site-footer-inner relative flex flex-wrap py-10 sm:justify-between
                    before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:block before:h-[1px] before:bg-[#ffffff14]
                ">
                    <div className="#brand  mb-6 justify-center sm:justify-start flex-none sm:flex-[50%] w-full inline-flex">
                        <a href="#">
                            <svg width="48" height="32" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
                                <title>Agnes</title>
                                <defs>
                                    <linearGradient x1="0%" y1="100%" y2="0%" id="logo-footer-a">
                                        <stop stopColor="#007CFE" stopOpacity="0" offset="0%"/>
                                        <stop stopColor="#007DFF" offset="100%"/>
                                    </linearGradient>
                                    <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="logo-footer-b">
                                        <stop stopColor="#FF4F7A" stopOpacity="0" offset="0%"/>
                                        <stop stopColor="#FF4F7A" offset="100%"/>
                                    </linearGradient>
                                </defs>
                                <g fill="none" fillRule="evenodd">
                                    <rect fill="url(#logo-footer-a)" width="32" height="32" rx="16"/>
                                    <rect fill="url(#logo-footer-b)" x="16" width="32" height="32" rx="16"/>
                                </g>
                            </svg>
                        </a>
                    </div>
                    <ul className="#footer-links mb-6 justify-center sm:justify-end sm:order-1 flex-none sm:flex-[50%] w-full inline-flex">
                        <li>
                            <a href="#" className='px-1 hover:underline'>Contact</a>
                        </li>
                        <li>
                            <a href="#" className='px-1 hover:underline ml-4'>About us</a>
                        </li>
                        <li>
                            <a href="#" className='px-1 hover:underline ml-4'>FAQ's</a>
                        </li>
                        <li>
                            <a href="#" className='px-1 hover:underline ml-4'>Support</a>
                        </li>
                    </ul>
                    <ul className="#footer-social-links justify-center mb-6 sm:justify-end flex-none sm:flex-[50%] w-full inline-flex">
                        <li>
                            <a href="#" className='p-2 text-[#6F8394] block'>
                                <span className="sr-only">Facebook</span>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z" fill="#FFFFFF"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" className='p-2 text-[#6F8394] block ml-4'>
                                <span className="sr-only">Twitter</span>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" fill="#FFFFFF"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" className='p-2 text-[#6F8394] block ml-4'>
                                <span className="sr-only">Google</span>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" fill="#FFFFFF"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <div className="#footer-copyright justify-center sm:justify-start flex-none sm:flex-[50%] w-full inline-flex">&copy; 2024 xscientist, all rights reserved</div>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Landing