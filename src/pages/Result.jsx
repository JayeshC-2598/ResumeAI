import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useOpenAIContext } from "../context/OpenAIContext";
import { useDocumentsContext } from "../context/DocumentsContext";
import Preview from "../components/result/Preview";


import { jsPDF } from "jspdf";



function Result() {
  // const { GetOpenAIResponse } = useOpenAIContext();
  const { GetDocumentById } = useDocumentsContext();


  const [resume, setDocument] = useState({
    name: "",
    resume_content: "",
    job_description: "",
    response: "",
    custom_instruction: "",
    created_on: "",
    category: null,
  });

  const { did } = useParams();
  const pdfRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!did) {
      toast.error("please select document.");
      return;
    }
    // console.log("PDF", PDF);
    GetDocumentById(did)
      .then((_document) => {
        if (!_document) {
          toast.error("document does not exist, please verify.");
          return;
        }
        console.log(_document);
        setDocument(_document);
      });
  }, []);
  
  const HandleClick = e => {
    const doc = new jsPDF({unit:"pt"});
    doc.html(pdfRef.current,{
      callback:(doc) => {
        doc.save();
      },
      margin:[60, 60, 60, 60],
      autoPaging:"text"
    })

  }

  const HandleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col">
        <Preview markdown={resume.response} pdfRef={pdfRef} />
      </div>
      <button className="fixed bottom-12 right-12 bg-blue-400 rounded-full w-14 h-14 active:bg-blue-500 active:scale-95 transition-all grid place-content-center" onClick={HandleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      </button>
      <div className="mt-8 containe mx-auto px-5 w-full bottom-0 hidden">
        <form
          className="bg-white p-2 shadow-xl rounded-t-xl"
          onSubmit={HandleSubmit}
        >
          <div className="flex">
            <textarea
              className="flex-1 outline-none focus:bg-gray-50 p-2"
              cols={"4"}
              row="3"
              placeholder="Request for change ... "
              style={{ fieldSizing: "content" }}
            ></textarea>
            <button className="w-28 group" type="button" ref={buttonRef}>
              <div
                className="p-2 rounded-md text-white bg-sky-500 border-b-4 border-sky-700 transition-all  group-hover:bg-sky-400"
                style={{ boxShadow: "border-box" }}
              >
                Send
              </div>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Result;
