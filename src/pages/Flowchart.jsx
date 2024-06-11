import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import RenderChart from "../components/Flowchart/RenderChart";
import Sidepanel from "../components/Flowchart/Sidepanel";
import FloatingForm from "../components/Flowchart/FloatingForm";
import { useDocumentsContext } from "../context/DocumentsContext";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import RenderFlowChart from "../components/Flowchart/RenderFlowChart";
import useTimeHook from "../hooks/useTimeHook";


import { ReactFlowProvider } from 'reactflow';
import { useAuthContext } from "../context/AuthContext";


const DefaultChart = {
  "nodes": [
    {
      id: 'Start',
      type: 'input',
      data: { label: 'Start' },
      position: { x: 250, y: 100 },
      style: {
        backgroundColor: '#3498db',
        color: '#000000',
        border: '2px solid #000000',
        borderRadius: '10px',
      },
    },
    {
      id: 'A',
      data: { label: 'Empty Graph' },
      position: { x: 250, y: 200 },
      style: {
        backgroundColor: '#ffcc00',
        color: '#000000',
        border: '2px solid #000000',
      },
    },
    {
      id: 'B',
      data: { label: 'Please provide instruction below..' },
      position: { x: 250, y: 300 },
      style: {
        backgroundColor: '#87ceeb',
        color: '#000000',
        border: '2px solid #000000',
      },
    },
    {
      id: 'End',
      type: 'output',
      data: { label: 'End' },
      position: { x: 250, y: 400 },
      style: {
        backgroundColor: '#3498db',
        color: '#000000',
        border: '2px solid #000000',
        borderRadius: '10px',
      },
    }
  ],
  "edges": [
    { id: 'e1-2', source: 'Start', target: 'A', animated: true },
    { id: 'e2-3', source: 'A', target: 'B', animated: true },
    { id: 'e3-4', source: 'B', target: 'End', animated: true },
  ]
}


function Flowchart() {
  const [chart, setChart] = useState(DefaultChart);

  const [formInput, setFormInput] = useState({ query: "", type: "simple" })
  const { GenerateGraph, SaveConversation, GetConversation } = useDocumentsContext();
  const [title, setTitle] = useState("Untitled");
  const [loading, setLoading] = useState(false);

  const { newlyRegistered, setNewlyRegistered } = useAuthContext();



  const { thread_id } = useParams();

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setChart({ "nodes": [], "edges": [] });
    GenerateGraph(formInput)
      .then((response) => {
        const output = response;
        console.log(output);
        setChart(output);
        setFormInput({ query: "" });
      }).catch((error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const HandleChange = (e) => {
    setFormInput({ query: e.target.value.toString() });
  }

  const SaveFlow = () => {
    SaveConversation()
      .then(response => toast.success(response.message))
      .catch(error => toast.error(error.message));
  }

  useEffect(() => {
    if (thread_id) {
      GetConversation(thread_id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          toast.error(error.message);
        })
    }
  }, []);

  return (
    <div className="w-full min-h-[calc(100svh_-_64px)] grid">
      <div className="px-3 sm:px-5 flex flex-col sm:flex-row">
        <div className="lg:w-72">
          <Sidepanel title={title} setTitle={setTitle} setFormInput={setFormInput} setChart={setChart} />
        </div>
        <div className="flex-1">
          <div className=" h-full shadow-[0px_8px_15px_-3px_rgba(0,0,0,0.2)] relative">
            <div className="w-full h-full overflow-auto relative">
              {/* <RenderChart chart={chart} SaveFlow={SaveFlow} /> */}
              <ReactFlowProvider>
                <RenderFlowChart query={formInput.query} _nodes={chart.nodes} _edges={chart.edges} SaveFlow={SaveFlow} />
              </ReactFlowProvider>
              <FloatingForm formInput={formInput} HandleSubmit={HandleSubmit} HandleChange={HandleChange} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flowchart;
