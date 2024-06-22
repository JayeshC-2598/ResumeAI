import React from 'react'
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, Position } from 'reactflow';

function SourceDirectedEdge({
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
        {/* <BaseEdge id={id} path={path} markerStart={"url(#logo)"} style={{ strokeWidth: 1, stroke: '#555' }} /> */}
      <BaseEdge id={id} path={path} markerStart={"url('#1__type=arrowclosed')"} style={{ ...props.style }} />
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
      </>)
}

export default SourceDirectedEdge