"use client"

import React, { memo } from "react"
import { Handle, NodeProps, Position } from "@xyflow/react"

function CustomNode({ data }: NodeProps) {
  return (
    <div className="rounded-md border-2 border-stone-400 bg-white px-4 py-2 shadow-md">
      <div className="flex">
        <input
          type="text"
          onChange={data.onChange as any}
          defaultValue={data.name as any}
        />
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  )
}

export default memo(CustomNode)
