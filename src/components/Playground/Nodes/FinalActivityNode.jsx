import React from 'react'
import { Handle, Position } from 'reactflow'

function FinalActivityNode({data:{label}}) {
    return (
        <div className='w-8 h-8 border-2 border-[#262626] rounded-full relative grid place-content-center'>
            <div className='w-6 h-6 rounded-full bg-[#262626]'></div>
            <div className="sr-only">{label}</div>
            <Handle position={Position.Top} type='target' />
        </div>
    )
}

export default FinalActivityNode