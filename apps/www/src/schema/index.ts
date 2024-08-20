import employeeSchema from "./employee"
import officeSchema from "./office"
import orgSchema from "./org"
import { timeoffSchema } from "./timeoff"
import workScheduleSchema from "./work-schedule"

const schema = {
  company: orgSchema,
  office: officeSchema,
  employee: employeeSchema,
  workSchedule: workScheduleSchema,
  timeOff: timeoffSchema,
}

export default schema
