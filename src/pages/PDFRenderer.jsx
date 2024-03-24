import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDocumentsContext } from '../context/DocumentsContext';


function PDFRenderer() {
  const { did } = useParams();
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
        setDocument(_document);
      });
  }, [])

  useEffect(()=>{
    if(resume.response != null){
      window.print();
    }
  },[resume.response])

  return (<div className="container mx-auto relative">
    <div className="print-this">
      <Markdown
        remarkPlugins={[remarkGfm]}
        className={
          "max-w-none prose prose-sm prose-indigo text-xs [&_pre]:bg-gray-200 [&_pre]:overflow-clip [&_pre]:text-slate-700  -p-8 -md:p-12"
        }
      >
        {resume.response}
      </Markdown>
    </div>
    <button className="fixed bottom-12 right-12 bg-blue-400 rounded-full w-14 h-14 active:bg-blue-500 active:scale-95 transition-all grid place-content-center" onClick={()=>{
      window.print();
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    </button>
  </div>
  )
}

export default PDFRenderer