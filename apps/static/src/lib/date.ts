import {
  addDays,
  addHours,
  addMinutes,
  differenceInDays,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns"

export function formatTimeDifference(start: Date, end: Date) {
  let diffInSeconds = differenceInSeconds(end, start)
  let diffInMinutes = differenceInMinutes(end, start)
  let diffInHours = differenceInHours(end, start)
  let diffInDays = differenceInDays(end, start)

  let result = ""

  if (diffInDays > 0) {
    result += `${diffInDays}d `
    start = addDays(start, diffInDays)
  }

  diffInHours = differenceInHours(end, start) // Recalculate after subtracting days
  if (diffInHours > 0) {
    result += `${diffInHours}hr `
    start = addHours(start, diffInHours)
  }

  diffInMinutes = differenceInMinutes(end, start) // Recalculate after subtracting hours
  if (diffInMinutes > 0) {
    result += `${diffInMinutes}m `
    start = addMinutes(start, diffInMinutes)
  }

  diffInSeconds = differenceInSeconds(end, start) // Recalculate after subtracting minutes
  if (diffInSeconds > 0) {
    result += `${diffInSeconds}s`
  }

  return result.trim()
}

export function convertElapsedTimeToDHMS(startTime: Date | string): string {
  const now = new Date()
  const start = new Date(startTime)

  // Calculate the total time difference in milliseconds
  const totalMilliseconds = differenceInMilliseconds(now, start)

  // Calculate the difference in full seconds
  const seconds = differenceInSeconds(now, start)

  // Calculate the remaining milliseconds after subtracting the full seconds
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10)

  const days = Math.floor(seconds / (3600 * 24))
  const hours = Math.floor((seconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  let time = ""

  if (days > 0) {
    time += `${String(days).padStart(1, "0")}:`
  }

  if (hours > 0) {
    time += `${String(hours).padStart(2, "0")}:`
  }

  time += `${String(minutes).padStart(2, "0")}:`
  time += `${String(secs).padStart(2, "0")}`

  return time.trim()
}
