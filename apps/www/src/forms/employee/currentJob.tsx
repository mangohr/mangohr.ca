import { useTransition } from "react"
import { updateEmployeeCurrentJob } from "@/_server/actions/employee"
import { employmentStatus } from "@/constants/employee"
import { useEmployee } from "@/context/employee"
import employeeSchema from "@/schema/employee"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { DatePicker } from "@/components/ui/date-picker"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectEmployee } from "@/components/combobox/selectEmployee"

export default function EmployeeCurrentJobForm({
  id,
  employeeUsername,
  setDataOptimistic,
  onSubmit,
}: {
  employeeUsername: string
  id: string
  onSubmit?: () => void
  setDataOptimistic: (
    val: z.infer<typeof employeeSchema.currentJob.create.validate>
  ) => void
}) {
  const form = useForm<
    z.infer<typeof employeeSchema.currentJob.create.validate>
  >({
    resolver: zodResolver(employeeSchema.currentJob.create.validate),
    defaultValues: {
      title: "",
      start_date: new Date().toISOString(),
      type: employmentStatus[0],
      reports_to: "",
    },
  })

  const [_, setTransition] = useTransition()
  const handleSubmit = form.handleSubmit(async (val) => {
    setTransition(() => {
      setDataOptimistic(val)
      updateEmployeeCurrentJob({ formData: val, username: employeeUsername })
    })
    onSubmit && onSubmit()
  })

  return (
    <Form {...form}>
      <form id={id} onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
              <FormLabel>Designation</FormLabel>
              <div>
                <FormControl>
                  <Input placeholder="Marketing Lead" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
              <FormLabel>Employment Type</FormLabel>
              <div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Employment Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employmentStatus.map((e, i) => (
                      <SelectItem key={i} value={e} className={"capitalize"}>
                        {e.replaceAll("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
              <FormLabel>Effective from</FormLabel>
              <div>
                <FormControl>
                  <DatePicker
                    selected={
                      (field.value && new Date(field.value)) || undefined
                    }
                    onSelect={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reports_to"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
              <FormLabel>Reports to</FormLabel>
              <div>
                <FormControl>
                  <SelectEmployee
                    selected={field.value}
                    setSelected={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
