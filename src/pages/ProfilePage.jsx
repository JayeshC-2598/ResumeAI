import React from 'react'

function ProfilePage() {
    return (
        <div>
            <pre className='block whitespace-pre-wrap'>
                {JSON.stringify({
  'nodes': [
    {
      'id': '1',
      'data': {
        'label': 'Start'
      },
      'position': {
        'x': 0,
        'y': 100
      },
      'type': 'startActivityNode'
    },
    {
      'id': '2',
      'data': {
        'label': 'Locate Gmail App on Phone'
      },
      'position': {
        'x': 200,
        'y': 300
      },
      'type': 'activityNode'
    },
    {
      'id': '3',
      'data': {
        'label': 'Open Gmail App'
      },
      'position': {
        'x': 400,
        'y': 300
      },
      'type': 'finalActivityNode'
    },
    {
      'id': '4',
      'data': {
        'label': 'End'
      },
      'position': {
        'x': 600,
        'y': 300
      },
      'type': 'finalFlowNode'
    }
  ],
  'edges': [
    {
      'id': 'E1-1',
      'source': '1',
      'target': '2',
      'type': 'targetDirectedEdge'
    },
    {
      'id': 'E2-2',
      'source': '2',
      'target': '3',
      'type': 'targetDirectedEdge'
    },
    {
      'id': 'E3-3',
      'source': '3',
      'target': '4',
      'type': 'targetDirectedEdge'
    }
  ]
})}
            </pre>
        </div>
    )
}

export default ProfilePage