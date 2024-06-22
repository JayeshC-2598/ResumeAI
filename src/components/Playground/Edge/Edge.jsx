import React from 'react'
import { BaseEdge, EdgeLabelRenderer, getBezierPath, getSimpleBezierPath, getSmoothStepPath } from 'reactflow'

function Edge({ label, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,...props }) {
  const [path, labelX, labelY, offsetX, offsetY] = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, })
  return (
    <>
      <BaseEdge path={path} markerStart="url('#dot')" style={{...props.style}} />
      {
        label && <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: '#ffcc00',
              padding: 10,
              borderRadius: 5,
              fontSize: 12,
              fontWeight: 700,
            }}
            className="nodrag nopan"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      }
    </>
  )
}

export default Edge