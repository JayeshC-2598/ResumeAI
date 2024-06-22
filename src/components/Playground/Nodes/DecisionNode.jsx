import React from 'react'
import { Handle, NodeResizeControl, NodeResizer, Position } from 'reactflow'

function DecisionNode({ id, data: { label }, selected }) {
  return (
    <div className='text-center aspect-square relative grid place-content-center p-2'>
      <div className='border-2 border-[#262626] bg-white rounded-xl absolute top-0 left-0 w-full h-full rotate-45 scale-[72%] -z-10'></div>

      {/* <NodeResizer minWidth={100} minHeight={100} maxHeight={200} maxWidth={200}  className="aspect-square" isVisible={false} keepAspectRatio /> */}
      <NodeResizeControl minWidth={80} minHeight={80} maxHeight={200} maxWidth={200} color={"transparent"} keepAspectRatio>
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="currentColor" d="M22 22h-2v-2h2zm0-4h-2v-2h2zm-4 4h-2v-2h2zm0-4h-2v-2h2zm-4 4h-2v-2h2zm8-8h-2v-2h2z"></path></svg>
      </NodeResizeControl>
      <span className='text-sm'>
        {label}
      </span>
      <Handle className='handle' type='target' id={`${id}TOP`} position={Position.Top} />
      <Handle className='handle' type='source' id={`${id}LEFT`} position={Position.Left} />
      <Handle className='handle' type='source' id={`${id}BOTTOM`} position={Position.Bottom} />
      <Handle className='handle' type='source' id={`${id}RIGHT`} position={Position.Right} />
    </div>
  )
}

export default DecisionNode