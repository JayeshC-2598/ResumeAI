import React from 'react'
import { Handle, Position } from 'reactflow';

function StartActivityNode({data:{label}}) {
  return (
    <div className='w-8 h-8 bg-[#262626] rounded-full relative'>
        <div className="sr-only">{label}</div>
        <Handle position={Position.Bottom} type='source' />
    </div>
  )
}

export default StartActivityNode;