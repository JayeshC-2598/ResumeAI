import React from 'react'
import { Handle, Position } from 'reactflow'

function FinalFlowNode({data:{label}}) {
  return (
    <div className='w-8 h-8 border-2 border-[#262626] text=[#262626] rounded-full bg-white p-0 grid place-content-center'>
        <Handle position={Position.Top} type='target' />
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 30L30 2m0 28L2 2"></path></svg>
        <div className="sr-only">{label}</div>
    </div>
  )
}

export default FinalFlowNode