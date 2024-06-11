// import mermaid from "mermaid";
import React, { useCallback, useEffect, useLayoutEffect } from "react";
import 'reactflow/dist/style.css';

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from 'reactflow';


function RenderFlowChart({ query, _nodes, _edges, SaveFlow }) {
  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(_nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(_edges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


  useEffect(() => {
    console.log(_nodes);
    if (!_nodes || _nodes.length <= 0)
      return;
    HandleRefresh();
  }, [_nodes, _edges])


  const HandleRefresh = () => {
    reactFlowInstance.setNodes(_nodes);
    reactFlowInstance.setEdges(_edges);
    reactFlowInstance.fitView({padding:1});
  }


  const Refresh = () => {
    console.log("Refresh");
  }

  return (
    <div className="w-full h-full max-h-[calc(100svh_-_8rem)] relative rounded-md overflow-hidden bg-white">
      <div className="min-h-full h-full">
        {/* <ReactFlowProvider> */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          fitViewOptions={{padding: 1}}
        >
          <MiniMap className="hidden sm:block" />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      <div className="absolute top-2 right-2">
        <div className="flex sm:flex-col-reverse gap-2">
          <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm h-8 px-3 flex items-center gap-1 group" onClick={() => HandleRefresh()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="group-active:animate-[spin_0.25s_ease-in-out]" width={18} height={18} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path></svg>
            <span className="hidden sm:block mb-0.5">
              Reset
            </span>
          </button>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm h-8 px-3 flex items-center gap-1 group" onClick={() => SaveFlow()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="group-active:scale-95 transition-all" width={18} height={18} viewBox="0 0 24 24"><path fill="currentColor" d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2M7 5h4v2h2V5h2v4H7zm0 8h10v6H7z"></path></svg>
            <span className="hidden sm:block mb-0.5">
              Save
            </span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default RenderFlowChart;