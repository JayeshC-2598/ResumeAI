import React from 'react'
import { useReactFlow } from 'reactflow';
import SchemaNodePanel from './NodePanel/SchemaNodePanel';
import ActivityNodePanel from './NodePanel/ActivityNodePanel';



const PanelRenderer = {
    'schemaNode': SchemaNodePanel,
    "startActivityNode": ActivityNodePanel,
    "finalActivityNode": ActivityNodePanel,
    "activityNode": ActivityNodePanel,
    "finalFlowNode": ActivityNodePanel,
    "decisionNode": ActivityNodePanel,
    "noteNode": ActivityNodePanel,
}

function NodePanel({ nodeId }) {
    // const { nodes, SetNodes } = useFlowchart();

    const { getNode } = useReactFlow();
    const node = getNode(nodeId);

    return (
        <div className='w-full bg-white px-4 py-2.5 rounded-md shadow-md'>
            <h2 className='font-bold'>Node</h2>
            {PanelRenderer[node?.type](node)}
        </div>
    )
}

export default NodePanel