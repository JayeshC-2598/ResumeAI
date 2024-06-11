import React, { useEffect, useState } from 'react'


const initialChart = {
  "nodes": [
    {
      id: 'Start',
      type: 'input',
      data: { label: 'Start' },
      position: { x: 250, y: 100 },
      style: {
        backgroundColor: '#3498db',
        color: '#000000',
        border: '2px solid #000000',
        borderRadius: '10px',
      },
    },
    {
      id: 'A',
      data: { label: 'Empty Graph' },
      position: { x: 250, y: 200 },
      style: {
        backgroundColor: '#ffcc00',
        color: '#000000',
        border: '2px solid #000000',
      },
    },
    {
      id: 'B',
      data: { label: 'Please provide instruction below..' },
      position: { x: 250, y: 300 },
      style: {
        backgroundColor: '#87ceeb',
        color: '#000000',
        border: '2px solid #000000',
      },
    },
  ],
  "edges":[
    { id: 'e1-2', source: 'Start', target: 'A', animated: true },
    { id: 'e2-3', source: 'A', target: 'B', animated: true },
  ]
}
function useTimeHook() {
    const [chart, setChart] = useState(initialChart);
    
    return { chart,setChart }
}

export default useTimeHook