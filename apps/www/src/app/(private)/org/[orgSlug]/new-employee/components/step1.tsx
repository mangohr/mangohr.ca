import React from "react"
import { employmentStatus } from "@/constants/employee"
import { useFormContext } from "react-hook-form"

import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectEmployee } from "@/components/combobox/selectEmployee"

export default function NewEmployeeStep1() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <FormItem>
        <FormLabel>Whats employee full name?</FormLabel>
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="">
                <div>
                  <FormControl>
                    <Input size={"lg"} placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middle_name"
            render={({ field }) => (
              <FormItem className="">
                <div>
                  <FormControl>
                    <Input size={"lg"} placeholder="Middle Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="">
                <div>
                  <FormControl>
                    <Input size={"lg"} placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </FormItem>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Whats employee email?</FormLabel>
            <div>
              <FormControl>
                <Input
                  size={"lg"}
                  placeholder="example@company.com"
                  aria-labelledby="names"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormItem>
        <FormLabel>Employee Current Job</FormLabel>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="job.title"
            render={({ field }) => (
              <FormItem className="">
                <div>
                  <FormControl>
                    <Input size={"lg"} placeholder="Designation" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job.type"
            render={({ field }) => (
              <FormItem className="">
                <div>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger size={"lg"}>
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
        </div>
      </FormItem>
      <FormField
        control={form.control}
        name="job.reports_to"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Reporting To</FormLabel>

            <div>
              <FormControl>
                <SelectEmployee
                  size={"lg"}
                  selected={field.value}
                  setSelected={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="action"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Select appropriate action</FormLabel>
            <div>
              <FormControl>
                <ButtonGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-2"
                >
                  {" "}
                  <ButtonGroupItem className="" value="create" label="Create">
                    <div className="flex items-center justify-center ">
                      <div className="flex-1 text-start">
                        <h2 className="font-semibold">Create Employee</h2>
                        <Label>
                          Will create an employee directly with data provided by
                          you.
                        </Label>
                      </div>
                    </div>
                  </ButtonGroupItem>
                  <ButtonGroupItem className="" value="invite" label="Invite">
                    <div className="flex items-center justify-center ">
                      <div className="flex-1 text-start">
                        <h2 className="font-semibold">Invite Employee</h2>
                        <Label>
                          Invited employee will be prompted to fill personal
                          data.
                        </Label>
                      </div>
                    </div>
                  </ButtonGroupItem>
                </ButtonGroup>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}
