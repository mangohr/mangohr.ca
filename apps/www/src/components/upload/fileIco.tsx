import React from "react"

export default function FileIco({
  className,
  mimeType,
}: {
  mimeType: string
  className: string
}) {
  let ico = "unknown"

  switch (mimeType) {
    case "application/pdf":
      ico = "pdf"
      break
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ico = "document"
      break
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      ico = "spreadsheet"
      break
    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      ico = "presentation"
      break
    case "image/jpeg":
    case "image/webp":
    case "image/png":
    case "image/gif":
    case "image/bmp":
    case "image/svg+xml":
      ico = "image"
      break
    case "video/mp4":
    case "video/avi":
    case "video/webm":
    case "video/quicktime":
      ico = "video"
      break
    case "audio/mpeg":
    case "audio/ogg":
    case "audio/wav":
    case "audio/aac":
      ico = "audio"
      break
    case "application/zip":
    case "application/x-rar-compressed":
      ico = "archive"
      break
    case "text/plain":
    case "text/html":
    case "text/xml":
    case "text/css":
    case "text/javascript":
      ico = "script"
      break
    default:
      ico = "unknown"
      break
  }

  return (
    <span>
      <img className={className} src={`/assets/fileico/${ico}.svg`} />
    </span>
  )
}
