import React from 'react'
import ReactFlow, { Background, Controls } from 'reactflow';
import { useFlowchart } from '../context/FlowchartContext';
import Rightpanel from '../components/Playground/Rightpanel';


function Playground() {
  const {
    flowchartRef,
    nodes,
    edges,
    nodeTypes,
    edgeTypes,
    onNodeDragStop,
    onNodesChange,
    onEdgesChange,
    onSelectionChange,
    onEdgesDelete,
    onConnect } = useFlowchart()


  return (
    <div className='flex flex-row h-[calc(100svh_-_4rem)]'>
      <div className='#bg-white h-full flex-1 relative'>
        <svg style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <marker className="react-flow__arrowhead" id="1__type=arrowclosed" markerWidth="12.5" markerHeight="12.5" viewBox="-10 -10 20 20" markerUnits="strokeWidth" orient="auto-start-reverse" refX="0" refY="0">
              <polyline strokeLinecap="round" strokeLinejoin="round" points="-5,-4 0,0 -5,4 -5,-4" style={{ "stroke": "#64748b", "fill": "#64748b", "strokeWidth": "1" }}></polyline>
            </marker>
            <marker className="react-flow__arrowhead" id="dot" markerWidth="12.5" markerHeight="12.5" markerUnits="strokeWidth" orient="auto-start-reverse" refX="0" refY="0">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M156 128a28 28 0 1 1-28-28a28 28 0 0 1 28 28"></path></svg>
            </marker>
          </defs>
        </svg>
        <ReactFlow
          ref={flowchartRef}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}

          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          onSelectionChange={onSelectionChange}
          onEdgesDelete={onEdgesDelete}

          snapToGrid={true}
          snapGrid={[2, 2]}
          fitView
        >
          <Background />
          <Controls />
          <Rightpanel />
        </ReactFlow>
      </div>
    </div>
  )
}

export default Playground