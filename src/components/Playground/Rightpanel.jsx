import React, { useEffect } from 'react'
import { Panel } from 'reactflow'
import ExportButtons from './panel/ExportButtons'
import NodePanel from './panel/NodePanel';
import { useFlowchart } from '../../context/FlowchartContext';
import EdgePanel from './panel/EdgePanel';

function Rightpanel() {
    const { Selected:{nodes:[node],edges:[edge]} } = useFlowchart();
    

    return (

        <Panel position="top-right" className='flex flex-col gap-2 w-64 max-h-full overflow-y-auto !m-0 p-4'>
            <div>
                <label className='font-semibold pl-1 mb-1'>Export :</label>
                <ExportButtons />
            </div>
            {
                node && <NodePanel nodeId={node.id} />
            }
            {

                edge && <EdgePanel edgeId={edge.id} />
            }
        </Panel>
    )
}

export default Rightpanel