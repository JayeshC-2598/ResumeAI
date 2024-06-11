import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDocumentsContext } from "../context/DocumentsContext";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';


const GetDate = (time) => new Date(time).toLocaleDateString('en-US', {
    day: "2-digit",
    year: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: "2-digit",
});
const FilteredDoc = ({ documents }) => {
    const navigate = useNavigate();
    const { DeleteDocument } = useDocumentsContext();

    const HandleNavigation = (document) => {
        console.warn(">>    HandleNavigation Clicked");
        navigate(`/flowchart/${document.thread_id}`)
    }
    const HandleDelete = (thread_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                DeleteDocument(thread_id)
                    .then((resp) => {
                        console.log(resp)
                        toast.success("Chat deleted successfully")
                    })
                    .catch((error) => console.error(error))
            }
          });
    }



    return documents.length > 0 ? (
        documents.map((document) => (
            <div
                key={document.thread_id}
                className="w-full rounded-md overflow-hidden relative bg-white shadow-lg transition-shadow"
            >
                <button className="absolute top-0 right-0 rounded-md bg-white text-rose-500 p-2 shadow-lg-" onClick={() => HandleDelete(document.thread_id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                    </svg>
                </button>
                <div onClick={() => HandleNavigation(document)} >
                    <div className="p-4">
                        <img
                            src={"https://cdn-icons-png.freepik.com/512/6863/6863999.png"}
                            alt="resume thumbnail"
                            className="w-full h-full outline outline-1 rounded p-3"
                            width={'190px'}
                            height={'270px'}
                        />
                    </div>
                    <div className="#absolute left-0 bottom-0 w-full text-slate-500 bg-white p-5 pt-0">
                        <p className="">{document?.title}</p>
                        <small>{
                            document.created_at &&
                            GetDate(document.created_at)
                        }</small>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <EmptyCard />
    );
};

const EmptyCard = () => (
    <Link to="flowchart" className="w-full rounded-md overflow-hidden relative bg-white shadow-lg transition-shadow p-5">
        <div className="p-5 aspect-[5/7] grid place-content-center border-2 border-dashed rounded border-slate-300 bg-gray-50 group cursor-pointer">
        <div className="w-14 h-14 bg-slate-300 rounded-full grid place-content-center group-hover:bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 2048 2048"><path fill="currentColor" d="M1920 896v128h-896v896H896v-896H0V896h896V0h128v896z"></path></svg>
        </div>
        </div>
    </Link>
);

const RecentDocs = () => {
    const { documents } = useDocumentsContext();


    return (
        <div className="font-inter  text-slate-600">
            <div className="container mx-auto px-5 md:px-10 max-w-7xl py-5">
                <h2 className="text-lg font-medium mb-5">
                    Your Flowcharts
                </h2>
                <div className="pb-5">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        <FilteredDoc
                            documents={
                                documents
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentDocs;
