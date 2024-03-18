import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentsContext } from "../context/DocumentsContext";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { usePaymentContext } from "../context/PaymentContext";
import { useOpenAIContext } from "../context/OpenAIContext";

const LoadingState = {
  WaitingPayment: "WaitingPayment",
  WaitingFileUploading: "WaitingFileUploading",
  WaitingResponse: "WaitingResponse",
  NoLoading: "NoLoading",
};
function Resume() {
  const { GetOpenAIResponse } = useOpenAIContext();
  const { AddNewDocument, GetTextFromResume } = useDocumentsContext();
  const { GenerateOrderDetail, InitialisePayment } = usePaymentContext();
  const [form, setForm] = useState({
    name: "",
    job_description: "",
    category: "resume",
  });
  // custom_instruction: "",
  // response: "",
  // resume_content: "",
  // created_on: ""
  const [file, setFile] = useState("");
  const [fileBlob, setFileBlob] = useState(null);

  // const [loading, setLoading] = useState(LoadingState.NoLoading);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const disabledBtn =
    form.name.length < 6 || form.job_description.length < 5 || loading;

  const HandleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    GenerateOrderDetail({
      ...form,
      price: 2500,
      description: "Resume charges",
      created_on: new Date(),
    })
      .then((orderResponse) => {
        console.log("GenerateOrderDetail", orderResponse);
        InitialisePayment(
          orderResponse.data,
          (response) => {
            // Successfull
            // GetOpenAIResponse().then((resp) => {
            //   console.log("resp=>", resp);
            // });
            console.log("InitialisePayment", response);
            HandleFileAndOpenAI();
          },
          (response) => {
            // Error
            console.error("InitialisePayment", response);
          },
          () => {
            // Finally
            console.log("setLoading(false);");
            setLoading(false);
          }
        );
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          error.message || "Something went wrong with payment service"
        );
        console.log(error.message);
      });
  };

  const HandleFileAndOpenAI = () => {
    // e.preventDefault();
    var formdata = new FormData();
    formdata.append("file", fileBlob, file);
    GetTextFromResume(formdata).then((response) => {
      console.log(response);
      const message = `RESUME: ${response.map(item => item.content)}\n\nJOB DESCRIPTION:${form.job_description}`

      GetOpenAIResponse(message).then((resp) => {
        console.log("resp=>", resp);
          AddNewDocument({
            ...form,
            resume_content: response,
            created_on: new Date(),
            response:resp
          }).then((docRef)=>{
            console.log(docRef);
            // {docRef.id}
            navigate(`/result/${docRef.id}`);
          });
      });
    });
  };

  const HandleFormChange = (e) => {
    e.preventDefault();
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const HandleFileChange = (e) => {
    setFile(e.target.value);
    setFileBlob(e.target.files[0]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-8">
      <div className="container max-w-7xl mx-auto px-5">
        <form
          className="mt-5- bg-white p-5 rounded-md shadow-2xl space-y-4 md:space-y-6 [&_label]:text-slate-700"
          onSubmit={HandleSubmit}
        >
          <h1 className="mt-2 mb-5 pl-2 text-2xl font-bold text-slate-700">
            Basic Information
          </h1>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 pl-2 text-sm font-medium text-gray-900"
            >
              Title: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2 placeholder:text-xs"
              placeholder="Resume or Job title.."
              required={true}
              value={form.name}
              onChange={HandleFormChange}
              autoFocus
            />
          </div>
          <div className="relative">
            <label
              htmlFor="resume"
              className="block mb-2 pl-2 text-sm font-medium text-gray-900"
            >
              Upload Resume: <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              multiple={false}
              accept=".doc, .docx, .pdf"
              name="resume"
              id="resume"
              value={file}
              required={true}
              className="opacity-0 absolute bottom-0"
              onChange={HandleFileChange}
            />
            <label
              htmlFor="resume"
              className="bg-gray-50 border-dashed border-2 border-slate-300 p-3 rounded-md min-h-36 flex justify-center items-center relative"
            >
              {file === "" ? (
                <>
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-12 h-12 text-blue-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="absolute bottom-5 inline-block text-xs text-slate-400">
                    Browse your resume{" "}
                    <span className="text-blue-500 underline cursor-pointer">
                      here.
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-12 h-12 text-emerald-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                      <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                    </svg>
                  </div>
                  <p className="absolute bottom-5 inline-block text-xs text-slate-500">
                    <span className="text-blue-500 underline cursor-pointer">
                      {file.split("\\").reverse()[0]}
                    </span>{" "}
                    selected
                  </p>
                </>
              )}
            </label>
          </div>
          <div className="grid grid-cols-8 gap-5 auto-rows-auto">
            <div className="col-span-8 -md:col-span-5">
              <label
                htmlFor="description"
                className="block mb-2 pl-2 text-sm font-medium text-gray-900"
              >
                Job Description: <span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <textarea
                  name="job_description"
                  id="description"
                  rows="10"
                  className="bg-gray-50 ring-1 ring-gray-300 text-slate-800 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 outline-none focus:ring-2 placeholder:text-xs placeholder:leading-relaxed"
                  placeholder={`Position of responceblity:\n * Job Role\n * Requirments...`}
                  required={true}
                  value={form.job_description}
                  onChange={HandleFormChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              className="px-8 py-2 bg-blue-500 text-white rounded-md focus:bg-blue-600 hover:bg-blue-600 active:bg-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={disabledBtn}
            >
              {loading ? <></> : <>Proceed to pay</>}
            </button>
          </div>
        </form>
      </div>
      {false && paymentInitiated && (
        <div className="fixed w-full h-full top-0 left-0 bg-white flex justify-center items-center">
          <div className="text-center">
            <span className="text-sky-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 16 16"
                className="animate-spin mx-auto"
              >
                <path
                  fill="currentColor"
                  d="M2.501 8a5.5 5.5 0 1 1 5.5 5.5A.75.75 0 0 0 8 15a7 7 0 1 0-7-7a.75.75 0 0 0 1.501 0"
                />
              </svg>
            </span>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resume;
