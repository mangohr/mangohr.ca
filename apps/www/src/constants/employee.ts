import { TimeOffStatus } from "@/types/db"

export const employmentStatus = [
  "full_time",
  "part_time",
  "remote_part_time",
  "remote_full_time",
] as const

export const timeOffStatus = ["approved", "pending", "rejected"] as const
