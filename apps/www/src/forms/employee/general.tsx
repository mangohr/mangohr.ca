import { useEffect, useTransition } from "react"
import { useParams } from "next/navigation"
import { updateEmployeeGeneralData } from "@/_server/actions/employee"
import { useEmployee } from "@/context/employee"
import employeeSchema from "@/schema/employee"
import { zodResolver } from "@hookform/resolvers/zod"
import { Minus, Plus } from "lucide-react"
import { useFieldArray, useForm, useFormContext } from "react-hook-form"
import { z } from "zod"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

const contact = {
  name: "",
  phone: "",
  relation: "",
}

export const EmployeeGeneralFormDefaultValues = {
  first_name: "",
  middle_name: "",
  last_name: "",
  gender: "",
  date_of_birth: "",
  work_email: "",
  phone: "",
  marital_status: "",
  address: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  },
  emergency_contacts: [contact],
}

export function EmployeeGeneralForm({
  id,
  onSubmit,
}: {
  id: string
  onSubmit?: () => void
}) {
  const { userName } = useParams() as any
  const [_, setTransition] = useTransition()
  const { employee, setOptimisticEmployee } = useEmployee()
  const form = useForm({
    resolver: zodResolver(employeeSchema.general.edit.validate),
    defaultValues: EmployeeGeneralFormDefaultValues,
  })

  useEffect(() => {
    employee && form.reset(employee || {})
  }, [employee])

  const handleSubmit = form.handleSubmit(async (val) => {
    setTransition(() => {
      updateEmployeeGeneralData({ formData: val, username: userName })
      setOptimisticEmployee(((p: any) => ({ ...p, ...val })) as any)
    })
    onSubmit && onSubmit()
  })

  return (
    <Form {...form}>
      <form id={id} onSubmit={handleSubmit}>
        <EmployeeGeneralFormContent />
      </form>
    </Form>
  )
}

export function EmployeeGeneralFormContent() {
  const form =
    useFormContext<z.infer<typeof employeeSchema.general.edit.validate>>()

  const { fields, append, remove } = useFieldArray({
    name: "emergency_contacts",
    control: form.control,
    keyName: "key",
  })
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="grid grid-cols-[auto,200px]">
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
            <FormLabel id="names">Full Name</FormLabel>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="">
                    <div>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          aria-labelledby="names"
                          {...field}
                        />
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
                        <Input
                          placeholder="Middle Name"
                          aria-labelledby="names"
                          {...field}
                        />
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
                        <Input
                          placeholder="Last Name"
                          aria-labelledby="names"
                          {...field}
                        />
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
            name="work_email"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Work Email</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="jhon@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Phone No.</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="+12 2234234342" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Date of birth</FormLabel>
                <div>
                  <FormControl>
                    <DatePicker
                      mode="single"
                      onSelect={field.onChange}
                      selected={
                        (field.value && new Date(field.value)) || undefined
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Gender</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="Select" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="marital_status"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Marital Status</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="Select" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="grid grid-cols-[auto,200px]">
          <CardTitle>Address Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormField
            control={form.control}
            name="address.line1"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Address Line 1</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="Address Line 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.line2"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Address Line 2</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="Address Line 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>City</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.state"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>State/Province</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="State/Province" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.country"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Country</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.zip_code"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Zip Code</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="Zip Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="grid grid-cols-[auto,200px]">
          <CardTitle>Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.length === 0 ? (
            <div className="rounded-md border p-4 text-center">
              <p>No Emergency Contacts...</p>
            </div>
          ) : (
            <Accordion type="single" collapsible defaultValue={fields[0]?.key}>
              {fields.map((f, i) => (
                <AccordionItem
                  key={f.key}
                  value={f.key}
                  className="rounded-md border"
                >
                  <div className="flex items-center pr-4">
                    <AccordionTrigger>
                      {f.name || "Unknown Contact"}
                    </AccordionTrigger>
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => remove(i)}
                    >
                      <Minus />
                    </Button>
                  </div>
                  <AccordionContent className="space-y-2 border-t">
                    <FormField
                      control={form.control}
                      name={`emergency_contacts.${i}.name`}
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                          <FormLabel>Name</FormLabel>
                          <div>
                            <FormControl>
                              <Input placeholder="Jhon Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`emergency_contacts.${i}.phone`}
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                          <FormLabel>Phone</FormLabel>
                          <div>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`emergency_contacts.${i}.relation`}
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                          <FormLabel>Relation</FormLabel>
                          <div>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <Button
            variant={"outline"}
            type="button"
            onClick={() => append(contact)}
          >
            <Plus />
            <span>Add Contact</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
