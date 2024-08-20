"use client"

import React, { useEffect } from "react"

import { convertElapsedTimeToDHMS } from "@/lib/date"

export default function Timer({
  startTime,
  time,
  setTime,
}: {
  startTime: Date | string
  time: string
  setTime: (s: string) => void
}) {
  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        return setTime(convertElapsedTimeToDHMS(startTime))
      }, 100)

      return () => clearInterval(interval)
    } else {
      setTime("00:00")
    }
  }, [startTime, time])

  const formattedTime = () => {
    return `${time}`
  }

  return <span className="text-2xl font-medium">{formattedTime()}</span>
}
