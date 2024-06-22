import React, { createContext, useCallback, useContext, useState } from 'react';
import { addEdge, useEdgesState, useNodesState } from 'reactflow';
import FinalFlowNode from '../components/Playground/Nodes/FinalFlowNode';
import StartActivityNode from '../components/Playground/Nodes/StartActivityNode';
import FinalActivityNode from '../components/Playground/Nodes/FinalActivityNode';
import ActivityNode from '../components/Playground/Nodes/ActivityNode';
import TargetDirectedEdge from '../components/Playground/Edge/TargetDirectedEdge';
import SchemaNode from '../components/Playground/Nodes/SchemaNode';
import DecisionNode from '../components/Playground/Nodes/DecisionNode';
import NoteNode from '../components/Playground/Nodes/NoteNode';
import Edge from '../components/Playground/Edge/Edge';
import SourceDirectedEdge from '../components/Playground/Edge/SourceDirectedEdge';
import BiDirectionalEdge from '../components/Playground/Edge/BiDirectionalEdge';



const FlowchartContext = createContext(null);



const initialState = {
  'nodes': [
    {
      'id': 'N1',
      'data': {
        'label': 'Start'
      },
      'position': {
        'x': 50,
        'y': 100
      },
      'type': 'startActivityNode'
    },
    {
      'id': 'N2',
      'data': {
        'label': 'Enter Username'
      },
      'position': {
        'x': 50,
        'y': 200
      },
      'type': 'activityNode'
    },
    {
      'id': 'N3',
      'data': {
        'label': 'Enter Password'
      },
      'position': {
        'x': 50,
        'y': 300
      },
      'type': 'activityNode'
    },
    {
      'id': 'N4',
      'data': {
        'label': 'Validate Credentials'
      },
      'position': {
        'x': 50,
        'y': 400
      },
      'type': 'activityNode'
    },
    {
      'id': 'N5',
      'data': {
        'label': 'Valid Credentials?'
      },
      'position': {
        'x': 300,
        'y': 400
      },
      'type': 'decisionNode'
    },
    {
      'id': 'N6',
      'data': {
        'label': 'Show Error Message'
      },
      'position': {
        'x': 50,
        'y': 500
      },
      'type': 'activityNode'
    },
    {
      'id': 'N7',
      'data': {
        'label': 'Display Dashboard'
      },
      'position': {
        'x': 50,
        'y': 600
      },
      'type': 'activityNode'
    },
    {
      'id': 'N8',
      'data': {
        'label': 'End'
      },
      'position': {
        'x': 50,
        'y': 700
      },
      'type': 'finalActivityNode'
    },
    {
      'id': 'N9',
      'data': {
        'label': 'Incorrect username or password'
      },
      'position': {
        'x': 300,
        'y': 500
      },
      'type': 'noteNode'
    }
  ],
  'edges': [
    {
      'id': 'E1-2',
      'source': 'N1',
      'target': 'N2',
      'type': 'targetDirectedEdge'
    },
    {
      'id': 'E2-3',
      'source': 'N2',
      'target': 'N3',
      'type': 'targetDirectedEdge'
    },
    {
      'id': 'E3-4',
      'source': 'N3',
      'target': 'N4',
      'type': 'targetDirectedEdge'
    },
    {
      'id': 'E4-5',
      'source': 'N4',
      'target': 'N5',
      'type': 'targetDirectedEdge'
    },
    {
      'id': 'E5-6',
      'source': 'N5',
      'target': 'N6',
      'type': 'targetDirectedEdge',
      'label': 'No'
    },
    {
      'id': 'E6-7',
      'source': 'N5',
      'target': 'N7',
      'type': 'targetDirectedEdge',
      'label': 'Yes'
    },
    {
      'id': 'E7-8',
      'source': 'N7',
      'target': 'N8',
      'type': 'targetDirectedEdge'
    },
    {
      'id': 'E8-6',
      'source': 'N6',
      'target': 'N2',
      'type': 'targetDirectedEdge'
    },
    {
      'id': 'E9-9',
      'source': 'N6',
      'target': 'N9',
      'type': 'targetDirectedEdge'
    }
  ],
  activeNode: null,
  activeEdge: null
}

export const constraints = {
  "PK": { name: "Primary Key", color: "#FF00FF", svg: <><svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24"><path fill="currentColor" d="M8.5 11c0 .732.166 1.424.449 2.051L5 17v1.5S5.896 20 7 20h2v-2h2v-2h2.5c2.762 0 5-2.238 5-5s-2.238-5-5-5s-5 2.238-5 5m5 2a2 2 0 1 1 .001-4.001A2 2 0 0 1 13.5 13"></path></svg></> },
  "FK": { name: "Foreign Key", color: "rgb(71, 85, 105)", svg: <><svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.325 0 5.663-2.337T20 12t-2.337-5.663T12 4T6.337 6.338T4 12t2.338 5.663T12 20m0-4q-1.65 0-2.825-1.175T8 12t1.175-2.825T12 8t2.825 1.175T16 12t-1.175 2.825T12 16"></path></svg></> },
  "UK": { name: "Unique Key", color: "rgb(71, 85, 105)", svg: <><svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="currentColor" d="M12.356 3.066a1 1 0 0 0-.712 0l-7 2.666A1 1 0 0 0 4 6.68a17.7 17.7 0 0 0 2.022 7.98a17.4 17.4 0 0 0 5.403 6.158a1 1 0 0 0 1.15 0a17.4 17.4 0 0 0 5.402-6.157A17.7 17.7 0 0 0 20 6.68a1 1 0 0 0-.644-.949z"></path></svg></> },
  "NN": { name: "Not Null", color: "rgb(71, 85, 105)", svg: <><svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m5 11H7v-2h10z"></path></svg></> },
  "CK": { name: "Check", color: "rgb(71, 85, 105)", svg: <><svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24"><path fill="currentColor" d="M8.5 11c0 .732.166 1.424.449 2.051L5 17v1.5S5.896 20 7 20h2v-2h2v-2h2.5c2.762 0 5-2.238 5-5s-2.238-5-5-5s-5 2.238-5 5m5 2a2 2 0 1 1 .001-4.001A2 2 0 0 1 13.5 13"></path></svg></> },
  "DF": { name: "Default", color: "red", svg: <></> },
  "NULL": { name: "No constraint", color: "red", svg: <></> },
}

const nodeTypes = {
  "Default": FinalFlowNode,
  "startActivityNode": StartActivityNode,
  "finalActivityNode": FinalActivityNode,
  "activityNode": ActivityNode,
  "finalFlowNode": FinalFlowNode,
  "decisionNode": DecisionNode,
  "noteNode": NoteNode,
  "schemaNode": SchemaNode,
}

const edgeTypes = {
  "edge": Edge,
  "targetDirectedEdge": TargetDirectedEdge,
  "sourceDirectedEdge": SourceDirectedEdge,
  "biDirectionalEdge": BiDirectionalEdge,
}

const initialSelected = { nodes: [], edges: [] };
function FlowchartContextProvider({ children }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialState.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialState.edges);
  const [Selected, setSelected] = useState(initialSelected)


  const onConnect = useCallback(
    (connection) => {
      console.log("onConnect" ,connection);
      setEdges((oldEdges) => addEdge({ ...connection, type: "targetDirectedEdge" }, oldEdges));
    },
    [setEdges],
  );



  // const setFlowchart = (object) => dispatch({ type: ActionState.SET, payload: object });
  // const updateFlowchart = (object) => dispatch({ type: ActionState.UPDATE, payload: object });

  const onSelectionChange = useCallback((event) => { setSelected(event); console.log("onSelectionChange", event.nodes, event.edges); }, [])

  const onNodeDragStop = useCallback((event, node) => console.log("onNodeDragStop", nodes.filter((_node)=>_node.id == node.id)), []);

  const onEdgesDelete = useCallback((edges) => console.log("onEdgesDelete", edges), []);
  // const onEdgeMouseMove = useCallback((event,edge) => console.log(event,edge),[]); //No Need
  // const onConnectStart = useCallback((event,edge) => console.log(event,edge),[])


  const SetNodes = useCallback((nodes) => { setNodes(nodes); }, []);
  const SetEdges = useCallback((edges) => { setEdges(edges); }, []);


  return (
    <FlowchartContext.Provider value={{

      nodes,
      edges,
      nodeTypes,
      edgeTypes,
      Selected,

      onConnect,
      onNodesChange,
      onEdgesChange,
      onNodeDragStop,
      onSelectionChange,
      onEdgesDelete,
      SetNodes,
      SetEdges,
    }}>
      {children}
    </FlowchartContext.Provider>
  )
}

export default FlowchartContextProvider


export const useFlowchart = () => {
  const context = useContext(FlowchartContext);
  if (!context)
    throw Error("FlowchartContext must be used within there provider");
  return context;
}