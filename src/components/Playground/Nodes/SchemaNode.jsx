import React from 'react'
import { Handle, Position } from 'reactflow'
import { constraints } from '../../../context/FlowchartContext'

function SchemaNode({ id, data: { label, attributes, methods } , selected}) {
  return (
    <div className='min-w-32 max-w-60 rounded-md bg-white shadow-md text-slate-500'>
      <div className='rounded-md divide-y relative'>
        <div className='h-1 bg-red-500 rounded-t-md'></div>
        <div className='px-5 py-1 text-base font-medium relative text-center text-slate-700'>
          {label ? label : "untitled"}
        </div>
        <div className={attributes ? 'visible' : 'invisible'}>
          {
            attributes && attributes.map((item, index) => <div key={item.id} className={`hover:bg-slate-50 relative h-6 flex flex-row items-center px-0.5 gap-0.5 text-[${constraints[item.constraint||"DF"].color}]`}>
              <Handle position={Position.Left} type='target' id={`${item.id}`} className='handle' />
              {
                item.constraint ?
                  <span className='flex-0 w-6 h-6 grid place-content-center' >
                    {constraints[item.constraint].svg}
                  </span> :
                  <span className='flex-0 w-6 h-6 grid place-content-center'>
                  </span>
              }
              <p className='text-sm' title={item.constraint && constraints[item.constraint].name}>
                {item.name}
              </p>
              <Handle position={Position.Right} type='source' id={`${item.id}`} className='handle' />
            </div>)
          }
        </div>
        {
          methods.length > 0 && <div className={methods ? 'visible' : 'invisible'}>
            {
              methods.map((item, index) => <div key={index} className='px-5 py-0.5 hover:bg-slate-50 relative'>
                {item.name}
              </div>)
            }
          </div>
        }
      </div>

    </div>
  )
}

export default SchemaNode