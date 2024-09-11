"use client"

import React, { useOptimistic, useState, useTransition } from "react"
import { deleteDepartmentAction } from "@/_server/actions/departments"
import { getDepartments } from "@/_server/handlers/org"
import DepartmentForm from "@/forms/department"
import { produce } from "immer"
import { Check, PenLine, Plus, Trash, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import EmptyPage from "@/components/pages/empty"

const DepartmentsInfo = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getDepartments>>
}) => {
  const [list, setList] = useOptimistic(data.items)

  const handleOptimistic = (
    val: Awaited<ReturnType<typeof getDepartments>>["items"][0]
  ) => {
    return setList((p) =>
      produce(p, (d) => {
        const idx = d.findIndex((f) => f.id === val.id)
        if (idx === -1) {
          d.unshift(val)
        } else {
          d[idx] = val
        }
        return d
      })
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex-1">
          <h1 className="text-xl font-medium">Department</h1>
          <Label>View list of company departments.</Label>
        </div>

        {/* <div className="ml-auto flex space-x-4">
          <DepartmentForm data={null} />
        </div> */}
      </div>
      <div className="flex gap-6">
        <div className="flex-1">
          <DepartmentForm data={null} setOptimistic={handleOptimistic} />
        </div>
        <Button type="submit" form="new-department">
          <Plus />
          <span>Add Department</span>
        </Button>
      </div>
      {list.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Company Departments</CardTitle>
            <CardDescription>List of all company departments</CardDescription>
          </CardHeader>
          <CardContent className="border-t px-0">
            {list.map((d, i) => (
              <SingleDepartment
                data={d}
                key={i}
                onEdit={handleOptimistic}
                setList={setList}
              />
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card className="flex h-96 p-8">
          <EmptyPage label="No departments found, Let's create one." />
        </Card>
      )}
    </div>
  )
}

function SingleDepartment({
  data,
  onEdit,
  setList,
}: {
  data: Awaited<ReturnType<typeof getDepartments>>["items"][0]
  onEdit: (val: Awaited<ReturnType<typeof getDepartments>>["items"][0]) => void
  setList: (val: Awaited<ReturnType<typeof getDepartments>>["items"]) => void
}) {
  const [show, setShow] = useState(false)
  const [_, start] = useTransition()
  const onRemove = (id: string) => {
    start(() => {
      setList(((p: any) => p.filter((f: any) => f.id !== id)) as any)
      deleteDepartmentAction(id)
    })
  }
  console.log({ data: data.name, show })
  const handle = (val: any) => {
    setShow(false)
    onEdit(val)
  }
  return (
    <div className="group flex items-center justify-between gap-2 border-b p-2 px-6 last:border-0">
      <div className="flex flex-1 items-center gap-2">
        {show ? (
          <>
            <div className="flex-1">
              <DepartmentForm data={data} setOptimistic={handle} />
            </div>
            <Button type="submit" size={"icon-sm"} form={data.id}>
              <Check />
            </Button>
          </>
        ) : (
          <p className="flex-1">{data.name}</p>
        )}
      </div>
      <Button
        type="button"
        size={"icon-sm"}
        variant={"outline"}
        onClick={() => setShow((p) => !p)}
        className={cn(!show && "opacity-0 group-hover:opacity-100")}
      >
        {!show ? <PenLine /> : <X />}
      </Button>
      {!show && (
        <Button
          type="button"
          size={"icon-sm"}
          variant={"outline"}
          className="opacity-0 group-hover:opacity-100"
          onClick={() => onRemove(data.id)}
        >
          <Trash />
        </Button>
      )}
    </div>
  )
}

export default DepartmentsInfo

// import React, { useCallback, useRef } from "react"
// import {
//   addEdge,
//   ConnectionLineType,
//   Edge,
//   Node,
//   Position,
//   ReactFlow,
//   ReactFlowProvider,
//   useEdgesState,
//   useNodesState,
//   useReactFlow,
// } from "@xyflow/react"
// import dagre from "dagre"
// import { Plus } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import CustomNode from "@/components/flow/node"

// import "@xyflow/react/dist/style.css"

// const position = { x: 0, y: 0 }
// const edgeType = ConnectionLineType.SmoothStep
// const nodeTypes = {
//   custom: CustomNode,
// }
// export const initialNodes = [
//   {
//     id: "0",
//     type: "custom",
//     data: { name: "input" },
//     position,
//   },
// ]

// export const initialEdges = [
//   { id: "e12", source: "1", target: "2", type: edgeType },
// ]

// const dagreGraph = new dagre.graphlib.Graph()
// dagreGraph.setDefaultEdgeLabel(() => ({}))

// const nodeWidth = 172
// const nodeHeight = 36

// const getLayoutedElements = (
//   nodes: Node<any, string>[],
//   edges: Edge<any>[],
//   direction = "TB"
// ) => {
//   const isHorizontal = direction === "LR"
//   dagreGraph.setGraph({ rankdir: direction })

//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
//   })

//   edges.forEach((edge) => {
//     dagreGraph.setEdge(edge.source, edge.target)
//   })

//   dagre.layout(dagreGraph)

//   nodes.forEach((node) => {
//     const nodeWithPosition = dagreGraph.node(node.id)
//     node.targetPosition = isHorizontal ? Position.Left : Position.Top
//     node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom

//     // We are shifting the dagre node position (anchor=center center) to the top left
//     // so it matches the React Flow node anchor point (top left).
//     node.position = {
//       x: nodeWithPosition.x - nodeWidth / 2,
//       y: nodeWithPosition.y - nodeHeight / 2,
//     }

//     return node
//   })

//   return { nodes, edges }
// }

// // const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
// //   initialNodes,
// //   initialEdges
// // );

// const Flow = () => {
//   const reactFlowWrapper = useRef(null)
//   const connectingNodeId = useRef(null)
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
//   const [edges, setEdges, onEdgesChange] = useEdgesState([])
//   const { screenToFlowPosition } = useReactFlow()

//   const onConnect = useCallback((params: any) => {
//     // reset the start node on connections
//     connectingNodeId.current = null
//     setEdges((eds) => addEdge({ ...params, type: edgeType }, eds) as any)
//   }, [])

//   // const onLayout = useCallback(
//   //   (direction: any) => {
//   //     const { nodes: layoutedNodes, edges: layoutedEdges } =
//   //       getLayoutedElements(nodes, edges, direction)

//   //     setNodes([...layoutedNodes])
//   //     setEdges([...layoutedEdges])
//   //   },
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   //   [nodes, edges]
//   // )

//   let id = 1
//   const getId = () => `${id++}`

//   const onConnectStart = useCallback((_: any, { nodeId }: any) => {
//     connectingNodeId.current = nodeId
//   }, [])

//   const onConnectEnd = useCallback(
//     (event: any) => {
//       if (!connectingNodeId.current) return

//       const targetIsPane = event.target.classList.contains("react-flow__pane")

//       if (targetIsPane) {
//         // we need to remove the wrapper bounds, in order to get the correct position
//         const id = getId() as any
//         const newNode = {
//           id,
//           position: screenToFlowPosition({
//             x: event.clientX,
//             y: event.clientY,
//           }),
//           type: "custom",
//           data: { name: `Node ${id}` },
//           origin: [0.5, 0.0],
//         }

//         setNodes((nds) => nds.concat(newNode))
//         setEdges((eds) =>
//           eds.concat({
//             id,
//             source: connectingNodeId.current,
//             target: id,
//             type: edgeType,
//           } as any)
//         )
//       }
//     },
//     [screenToFlowPosition]
//   )
//   return (
//     <ReactFlow
//       nodes={nodes}
//       edges={edges}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       onConnect={onConnect}
//       nodeTypes={nodeTypes}
//       connectionLineType={ConnectionLineType.SmoothStep}
//       onConnectStart={onConnectStart}
//       onConnectEnd={onConnectEnd}
//       fitView
//       fitViewOptions={{ padding: 2 }}
//       nodeOrigin={[0.5, 0]}
//       ref={reactFlowWrapper}
//       proOptions={{
//         hideAttribution: true,
//       }}
//     >
//       {/* <MiniMap /> */}
//       {/* <Controls /> */}
//       {/* <Background /> */}
//     </ReactFlow>
//   )
// }

// export default function DepartmentsInfo() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center space-x-6">
//         <div className="flex-1">
//           <h1 className="text-xl font-medium">Departments</h1>
//           <Label>List of departments in your company.</Label>
//         </div>
//         <Button variant={"outline"}>
//           <span>
//             <Plus className="size-4" />
//           </span>
//           <span>Add Department...</span>
//         </Button>
//       </div>
//       <Card className="h-[600px]">
//         <ReactFlowProvider>
//           <Flow />
//         </ReactFlowProvider>
//       </Card>
//     </div>
//   )
// }
