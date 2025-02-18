"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  documentUpload,
  getAllDocuments,
  getDocumentDownloadUrl,
  onDocumentUploadRemove,
  onDocumentUploadSuccess,
} from "@/_server/actions/document"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { useQueryClient } from "@tanstack/react-query"
import { createColumnHelper } from "@tanstack/react-table"
import { produce } from "immer"
import { ArrowUpRight, Check, Eye, File, Trash, Upload, X } from "lucide-react"

import { formatBytes } from "@/lib/size"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import ListTable from "@/components/tables"
import FileIco from "@/components/upload/fileIco"

type SingleFile = {
  id: string
  file: File
  status: "pending" | "success" | "error"
}
const columnHelper =
  createColumnHelper<Awaited<ReturnType<typeof getAllDocuments>>["items"][0]>()

const columns = [
  columnHelper.accessor("name", {
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-fit p-0 hover:bg-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row, table }) => (
      <Link
        href={`/org/${table.options.meta.orgSlug}/preview?type=document&path=${encodeURIComponent(row.original.location)}`}
        target="_blank"
        className="flex items-center gap-2"
      >
        <span>
          <FileIco className="size-6" mimeType={row.original.type} />
        </span>
        <span>{row.getValue("name")}</span>
      </Link>
    ),
  }),
  columnHelper.accessor("size", {
    meta: {
      headerClassName: "w-[100px]",
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-fit p-0 hover:bg-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ getValue, row, table }) => (
      <Link
        href={`/org/${table.options.meta.orgSlug}/preview?type=document&path=${encodeURIComponent(row.original.location)}`}
        target="_blank"
      >
        {formatBytes(getValue())}
      </Link>
    ),
  }),
  columnHelper.display({
    id: "actions",
    meta: {
      headerClassName: "w-[75px]",
    },
    enableHiding: false,
    cell: ({ row, table }) => {
      return (
        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100">
          <Link
            href={`/org/${table.options.meta.orgSlug}/preview?type=document&path=${encodeURIComponent(row.original.location)}`}
            target="_blank"
            className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
          >
            <span className="sr-only">View File</span>
            <ArrowUpRight className="size-4" />
          </Link>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => table.options.meta.onDelete(row.original.id)}
          >
            <span className="sr-only">Delete File</span>
            <Trash className="size-4" />
          </Button>
        </div>
      )
    },
  }),
]

export function DocumentList() {
  const [list, setList] = useState<Array<SingleFile>>([])
  const { orgSlug } = useParams()
  const queryClient = useQueryClient()
  const { userName } = useParams() as { userName: string }

  const queryKey = "documents"

  const setFile = (files: FileList) => {
    const newFiles: any = []
    for (let i = 0; i < files.length; i++) {
      const f = files[i]
      newFiles.push({
        id: crypto.randomUUID(),
        file: f,
        status: "pending",
      })
    }

    setList((p) => [...newFiles, ...p])
  }

  const onRemove = async (id: string) => {
    setList((p) => p.filter((f) => f.id !== id))
    await onDocumentUploadRemove({ id })
  }
  const onError = (id: string) => {
    setList((p) =>
      produce(p, (d) => {
        const idx = d.findIndex((f) => f.id === id)
        if (idx === -1) return
        d[idx].status = "error"
      })
    )
  }
  const onSuccess = async (id: string) => {
    setList((p) =>
      produce(p, (d) => {
        const idx = d.findIndex((f) => f.id === id)
        if (idx === -1) return
        d[idx].status = "success"
      })
    )
    await onDocumentUploadSuccess({ id })
  }

  const onDelete = async (id: string) => {
    await onDocumentUploadRemove({ id })
    queryClient.invalidateQueries({ queryKey: [queryKey] })
  }

  const handleInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: [queryKey] })
    setList((p) => p.filter((f) => f.status !== "success"))
  }

  useEffect(() => {
    if (list.length === 0) return
    const pendingList = list.filter((f) => f.status === "pending")
    if (pendingList.length === 0) {
      handleInvalidate()
    }
  }, [list])

  return (
    <>
      <div className="flex items-center space-x-6">
        <div className="flex-1">
          <h1 className="text-xl font-medium">Documents</h1>
          <Label>List of all your uploaded documents.</Label>
        </div>
      </div>

      <ListTable
        queryKey={queryKey}
        columns={columns}
        getData={(params) => getAllDocuments({ searchParams: params })}
        meta={{ orgSlug, onDelete }}
        components={{
          navbar: {
            after: (
              <label className={buttonVariants({})}>
                <input
                  className="absolute left-0 top-0 w-full opacity-0"
                  type="file"
                  multiple={true}
                  onChange={(e) => e.target.files && setFile(e.target.files)}
                />
                <Upload /> <span>Upload</span>
              </label>
            ),
            below: list.length > 0 && (
              <Card>
                <CardHeader className="grid grid-cols-[auto,200px]">
                  <CardTitle>Documents Uploading...</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {list.map((t, i) => (
                    <FileUpload
                      data={t}
                      key={t.id}
                      onRemove={onRemove}
                      onSuccess={onSuccess}
                      employeeUsername={userName}
                      onError={onError}
                    />
                  ))}
                </CardContent>
              </Card>
            ),
          },
        }}
        config={{
          searchInput: {
            placeholder: "Search document name...",
          },
          empty: { title: "No Documents!" },
          loading: { title: "Finding Documents" },
        }}
      />
    </>
  )
}

function FileUpload({
  data,
  onRemove,
  onSuccess,
  onError,
  employeeUsername,
}: {
  data: SingleFile
  onRemove: (id: string) => void
  onSuccess: (id: string) => void
  onError: (id: string) => void
  employeeUsername: string
}) {
  const [progress, setProgress] = useState(0)

  const abortController = useRef(new AbortController())

  const uploadFile = async (file: File) => {
    try {
      // Get presigned URL
      const url = await documentUpload({
        id: data.id,
        filename: file.name,
        contentType: file.type,
        contentLength: file.size,
        employeeUsername,
      })

      // Custom upload with progress
      await uploadWithProgress(url, file)
      onSuccess(data.id)
      console.log("Upload successful")
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Upload cancelled")
      } else {
        console.error("Upload failed:", error)
      }
    }
  }

  const uploadWithProgress = (url: string, file: File) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open("PUT", url)

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100
          setProgress(percentComplete)
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`))
        }
      }

      xhr.onerror = () => {
        onError(data.id)
        reject(new Error("Network error occurred"))
      }

      xhr.onabort = () => {
        reject(new Error("Upload aborted"))
      }

      abortController.current.signal.addEventListener("abort", () =>
        xhr.abort()
      )

      xhr.send(file)
    })
  }

  const cancelUpload = () => {
    abortController.current.abort()
    abortController.current = new AbortController()
    onRemove(data.id)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      data.file && data.status === "pending" && uploadFile(data.file)
    }, 500)
    return () => clearTimeout(timer)
  }, [data.file])

  return (
    <div>
      <ProgressPrimitive.Root
        className={"bg-primary/20 relative w-full overflow-hidden rounded-md"}
      >
        <ProgressPrimitive.Indicator
          className="bg-primary/70 absolute left-0 top-0 size-full flex-1 transition-all"
          style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
        />
        <div className="relative z-10 flex h-8 items-center px-4">
          <div className="flex-1">
            <p className=" line-clamp-1 max-w-screen-sm">{data.file.name}</p>
          </div>
          {data.status === "pending" ? (
            <Button
              variant={"link"}
              className="text-foreground hover:text-primary"
              size={"icon-sm"}
              onClick={cancelUpload}
            >
              <X className="size-4" />
            </Button>
          ) : data.status === "success" ? (
            <Check className="size-4" />
          ) : null}
        </div>
      </ProgressPrimitive.Root>
    </div>
  )
}
