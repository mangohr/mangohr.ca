import React, { useState, useTransition } from "react"
import {
  deleteAttendance,
  getAllAttendance,
} from "@/_server/actions/attendance"
import { queryKeys } from "@/constants/queryKeys"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useQueryClient } from "@tanstack/react-query"
import { PenLine, Trash } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import UpdateAttendanceForm from "./updateAttendance"

export default function AttendanceActions({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllAttendance>>["items"][0]
}) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [pending, setTransition] = useTransition()
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setTransition(async () => {
      setEditOpen(true)
      deleteAttendance({ id: data.id }).then((v) => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.attendanceList] })
        setDeleteOpen(false)
      })
    })
  }

  return (
    <>
      <UpdateAttendanceForm data={data} open={editOpen} setOpen={setEditOpen} />
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              attendance from records!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteOpen(false)}
              disabled={pending}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={pending}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <PenLine />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
              <Trash />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
