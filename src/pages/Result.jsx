import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useOpenAIContext } from "../context/OpenAIContext";
import { useDocumentsContext } from "../context/DocumentsContext";
import Preview from "../components/result/Preview";

// import * as PDF from "pdfmake";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// import htmlToPdfmake from "html-to-pdfmake"

// import pdf from 'html-pdf';
// import { saveAs } from 'file-saver';

import html2pdf from 'html2pdf.js';
// import jsPDF from 'jspdf';







function Result() {
  const { GetOpenAIResponse } = useOpenAIContext();
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

    console.log(pdfRef.current);
    if(buttonRef.current){
      buttonRef.current.addEventListener("click",HandleClick);
    }
    // return ()=> buttonRef.current.removeEventListener("click",HandleClick);
  }, []);
  const HandleClick = e =>{
    // console.log(document);
    // if(!pdfRef.current)
    // return;
    // var printContents = pdfRef.current.innerHTML;
    // var originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;



    // doc.ht/\ml(pdfRef.current.innerHTML)



    const opt = {
      margin:       1,
      filename:     'converted.pdf',
      image:        { type: 'jpeg', quality: 0.2 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(pdfRef.current.innerHTML).set(opt).save();
}

  const HandleSubmit = (e) => {
    e.preventDefault();
  };

  // useEffect(()=>{
  //     GetOpenAIResponse("Hi there, what format the resume will be ?".replace(" ","_")).then((resp)=>{
  //         console.log("resp=>",resp);
  //     })
  // },[])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col">
        <Preview markdown={resume.response} pdfRef={pdfRef} />
      </div>
      <div className="mt-8 containe mx-auto px-5 w-full bottom-0 ">
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
