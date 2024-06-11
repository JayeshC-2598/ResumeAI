import React from "react";
import { Popover } from '@headlessui/react'
import { useDocumentsContext } from "../../context/DocumentsContext";


function Sidepanel({ title, setTitle, setChart, setFormInput }) {
    const { conversation, setConversation } = useDocumentsContext();

    const HandleChange = (e) => {
        setConversation({ ...conversation, title: e.target.value });
    }

    const HandleClick = (item) => {
        if (typeof (item.output_string) === "string") {
            setChart(JSON.parse(item.output_string));
        } else {
            setChart(item.output_string);
        }
        setFormInput({ query: item.input_string });
    }

    return (
        <div className="">
            <Popover className="lg:hidden ">
                <Popover.Button as="button" className="fixed z-10 top-16 left-5 bg-white w-8 h-8 grid place-content-center rounded-md sm:translate-x-2 translate-y-2 active:scale-95 transition-all outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"></path></svg>
                </Popover.Button>
                <Popover.Overlay className="fixed inset-0 top-16 bg-black opacity-5 z-10" />
                <Popover.Panel className="absolute bottom-0 left-0 top-14 z-20 w-80 bg-blue-50 p-3 shadow-lg max-w-full">
                    <div className="block p-3 bg-white rounded-lg mb-2 sm:mb-5">
                        <label className="text-gray-700">Title</label>
                        <input type="text" className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-2 outline-none" placeholder="" value={conversation.title} onChange={HandleChange} />
                    </div>
                    <div className="">
                        <h1 className="mb-2 font-semibold">Your Log's</h1>
                        <div className="overflow-auto max-h-[calc(100svh_-_230px)]">
                            <div className="flex flex-col gap-3 mr-2 pb-2">
                                {
                                    conversation.logs.map((item, index) => <button key={index} className="w-full flex-shrink-0 sm:w-full bg-sky-100 border border-blue-200 rounded-md p-3" onClick={() => HandleClick(item)}>
                                        <p className="text-left">{item.input_string}</p>
                                    </button>)
                                }
                                {
                                    conversation?.logs.length == 0 && <button className="w-full flex-shrink-0 sm:w-full bg-gray-100 border border-slate-300 rounded-md p-3">
                                        <p className="text-left">Get me a new Bicycle.</p>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Popover>
            <div className="hidden lg:block lg:pr-3">
                <div className="block p-3 bg-white rounded-lg shadow-lg mb-2 sm:mb-5">
                    <label className="text-gray-700">Title</label>
                    <input type="text" className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-2 outline-none" placeholder="" value={conversation.title} onChange={HandleChange} />
                </div>
                <div className="">
                    <h1 className="mb-2 font-semibold">Your Log's</h1>
                    <div className="overflow-auto max-h-[calc(100svh_-_220px)]">
                        <div className="flex flex-row sm:flex-col gap-3 m-0 sm:mr-2 pb-2">
                            {
                                conversation.logs.map((item, index) => <button key={index} className="w-full flex-shrink-0 sm:w-full bg-sky-100 border border-blue-200 rounded-md p-3" onClick={() => HandleClick(item)}>
                                    <p className="text-left line-clamp-4">{item.input_string}</p>
                                </button>)
                            }
                            {
                                conversation?.logs.length == 0 && <button className="w-full flex-shrink-0 sm:w-full bg-gray-100 border border-slate-300 rounded-md p-3">
                                    <p className="text-left">Get me a new Bicycle.</p>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidepanel;
