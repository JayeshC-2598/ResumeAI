import React from 'react'
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, getStraightPath, MarkerType, Position, SmoothStepEdge } from 'reactflow'

function TargetDirectedEdge({
  id,
  label,
  source,
  target,
  selected,
  animated,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerStart,
  markerEnd,
  ...props
}) {
  const [path, labelX, labelY, offsetX, offsetY] = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition })

  return (<>
    <BaseEdge id={id} path={path} markerEnd={"url('#1__type=arrowclosed')"} style={{ ...props.style }} />
    {/* <BaseEdge id={id} path={path} markerStart={"url('#1__type=arrowclosed')"} markerEnd={"url('#1__type=arrowclosed')"} style={{ ...props.style }} /> */}
    {
      label && <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: '#ffcc00',
            padding:"0.05rem",
            paddingLeft:"0.75rem",
            paddingRight:"0.75rem",
            paddingBottom:"0.12rem",
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
  </>)
}

export default TargetDirectedEdge