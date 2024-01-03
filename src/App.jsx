import React, { Fragment, useState } from "react";
import { FaUser } from "react-icons/fa";
import { LuFilePlus } from "react-icons/lu";
import { LuFileUp } from "react-icons/lu";

import IMG_resume from "./assets/img/resume.png";

import { Tab } from "@headlessui/react";

// import Navbar from "./components/Navbar/Navbar";
// import Welcome from "./components/Welcome/Welcome";
// import YourDocuments from "./components/YourDocuments/YourDocuments";
// import "./App.css";
// function App() {
//     return (
//         <>
//             <Navbar />
//             <Welcome />
//             <YourDocuments />
//         </>
//     );
// }
// export default App;



const Navbar = () => {
    return (
        <header className="font-inter">
            <div className="container mx-auto px-5 max-w-7xl">
                <nav className="h-16 w-full flex items-center justify-between">
                    <a
                        href="#"
                        className="font-bold tracking-wider group text-lg"
                    >
                        Resume
                        <span className="text-blue-500 transition-colors group-hover:text-blue-600">
                            AI
                        </span>
                    </a>
                    <button className="outline-none rounded-full shadow-lg p-2 bg-white ">
                        <FaUser className="w-4 h-4 text-slate-400" />
                    </button>
                </nav>
            </div>
        </header>
    );
};

const HeroSection = () => {
    return (
        <div className="font-inter">
            <div className="container mx-auto px-5 max-w-7xl">
                <div className="py-12">
                    <h1 className="text-center text-3xl font-light text-slate-700">
                        Welcome,{" "}
                        <span className="font-semibold">
                            Guest!
                        </span>{" "}
                        <span className="font-noto">
                            👋
                        </span>
                    </h1>

                    <div className="mt-5 mx-auto w-full max-w-xl p-5 text-sm text-white flex gap-5 flex-wrap">
                        <button className="flex-1 flex items-center text-start gap-3 rounded-md bg-sky-600 p-8 py-5 hover:bg-sky-500 transition-colors">
                            <LuFilePlus className="w-10 h-10" />
                            <div>
                                <p>
                                    Create
                                    your
                                </p>
                                <p className="font-semibold">
                                    Resume
                                </p>
                            </div>
                        </button>
                        <button className="flex-1 flex items-center text-start gap-3 rounded-md bg-sky-600 p-8 py-5 hover:bg-sky-500 transition-colors">
                            <LuFileUp className="w-10 h-10" />
                            <div>
                                <p>
                                    Upload &{" "}
                                    <br />
                                    Modify
                                    existing
                                </p>
                                <p className="font-semibold">
                                    Resume
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FilteredDoc = ({ selected, documents, type }) => {

    const selectedDoc = selected === 0 ? documents : documents.filter((item) => item.type === type);

    return selectedDoc.map((document) => (
        <div key={document.id} className="w-full rounded-md overflow-hidden relative bg-white shadow-lg transition-shadow">
            <div className="p-5">
                <img
                    src={IMG_resume}
                    alt="resume thumbnail"
                    className="w-full h-full outline outline-1 rounded-sm"
                />
            </div>
            <div className="absolute left-0 bottom-0 w-full text-slate-500 bg-white p-5">
                <p className="">{document.title}</p>
                <small>{document.lastUpdated}</small>
            </div>
        </div>
    ));
};

const RecentsDocs = () => {
    const [selectedId, setSelectedId] = useState(0);
    const tabtypes = ["all", "resume", "coverletter"];
    const [documents, setDocuments] = useState([
        {
            id: 1,
            title: "Untitled 1",
            lastUpdated: "2 days ago",
            type: "resume",
        },
        {
            id: 2,
            title: "Untitled 2",
            lastUpdated: "1 days ago",
            type: "coverletter",
        },
        {
            id: 3,
            title: "Untitled 3",
            lastUpdated: "2 days ago",
            type: "resume",
        },
        {
            id: 4,
            title: "Untitled 4",
            lastUpdated: "3 days ago",
            type: "resume",
        },
        {
            id: 5,
            title: "Untitled 5",
            lastUpdated: "2 days ago",
            type: "coverletter",
        },
    ]);
    return (
        <div className="font-inter  text-slate-600">
            <div className="container mx-auto px-5 md:px-10 max-w-7xl py-5">
                <h2 className="text-lg font-medium mb-5">
                    Your Documents
                </h2>
                <div className="">
                    <Tab.Group onChange={setSelectedId}>
                        <Tab.List className="text-white  mb-5">
                            {tabtypes.map(
                                (type) => (
                                    <Tab
                                        key={
                                            type
                                        }
                                        className={`${type ===
                                            tabtypes[
                                            selectedId
                                            ]
                                            ? "bg-sky-500 text-white"
                                            : "text-slate-500"
                                            } px-5 py-1 pb-1.5 text-sm outline-none rounded-full capitalize`}
                                    >
                                        {
                                            type
                                        }
                                    </Tab>
                                )
                            )}
                        </Tab.List>
                        <Tab.Panels>
                            {tabtypes.map(
                                (type) => (
                                    <Tab.Panel
                                        key={type}
                                        className={
                                            "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
                                        }
                                    >
                                        <FilteredDoc
                                            selected={
                                                selectedId
                                            }
                                            type={
                                                tabtypes[
                                                selectedId
                                                ]
                                            }
                                            documents={
                                                documents
                                            }
                                        />
                                    </Tab.Panel>
                                )
                            )}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div>
    );
};

function App() {
    return (
        <div className="w-full min-h-svh font-inter bg-blue-50">
            <Navbar />
            <HeroSection />
            <RecentsDocs />
        </div>
    );
}
export default App;
