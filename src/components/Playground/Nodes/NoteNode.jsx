import React from 'react'
import { Handle, Position } from 'reactflow'

function NoteNode({id,data:{label}}) {
  return (
    <div className='border-2 border-dashed border-[#262626] min-w-32 max-w-60 rounded-md text-center bg-white'>
        <div className='p-2 pb-2.5'>
            {label}
        </div>
        <Handle type='target' id={`${id}LEFT`} position={Position.Left} />
        <Handle type='source' id={`${id}RIGHT`} position={Position.Right} />
        <Handle type='source' id={`${id}TOP`} position={Position.Top} />
        <Handle type='source' id={`${id}BOTTOM`} position={Position.Bottom} />
    </div>
  )
}

export default NoteNode