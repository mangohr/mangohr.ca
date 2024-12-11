"use client"

import { useEffect, useState, useTransition } from "react"
import { useParams } from "next/navigation"
import { updateEmployeeGeneralData } from "@/_server/actions/employee"
import { useEmployee } from "@/context/employee"
import employeeSchema from "@/schema/employee"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Minus, PenLine, Plus } from "lucide-react"
import { useFieldArray, useForm, useFormContext } from "react-hook-form"
import { z } from "zod"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { DateTimePicker } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  FromSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

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

function FormComp({
  id,
  onSubmit,
  bareForm = false,
}: {
  id: string
  onSubmit?: (val: z.infer<typeof employeeSchema.general.edit.validate>) => void
  bareForm?: boolean
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
      !bareForm &&
        updateEmployeeGeneralData({ formData: val, username: userName })
      setOptimisticEmployee(((p: any) => ({ ...p, ...val })) as any)
    })
    onSubmit && onSubmit(val)
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
                    <Input placeholder="example@company.com" {...field} />
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
                    <Input placeholder="+1 250 123 0909" {...field} />
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
                    <DateTimePicker
                      granularity="day"
                      value={
                        (field.value && new Date(field.value)) || undefined
                      }
                      onChange={field.onChange}
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
                  <FromSelect
                    placeholder="Select Gender"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "non-binary", label: "Non Binary" },
                      { value: "other", label: "Other" },
                      { value: "", label: "Prefer not to say" },
                    ]}
                  />
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
                  <FromSelect
                    placeholder="Select Marital Status"
                    value={field.value}
                    onValueChange={field.onChange}
                    options={[
                      { value: "married", label: "Married" },
                      { value: "un-married", label: "Un Married" },
                      { value: "common-law", label: "Common Law" },
                      { value: "other", label: "Other" },
                      { value: "", label: "Prefer not to say" },
                    ]}
                  />
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
                <FormLabel>Postal Code/Zip Code</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="Postal Code/Zip Code" {...field} />
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

export function EmployeeGeneralForm({
  employee,
  bareForm,
  onSubmit,
}: {
  employee: ReturnType<typeof useEmployee>["employee"]
  bareForm?: Parameters<typeof FormComp>[0]["bareForm"]
  onSubmit?: Parameters<typeof FormComp>[0]["onSubmit"]
}) {
  const [edit, setEdit] = useState(false)
  const formId = "employee-general"
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex-1">
          <h1 className="text-xl font-medium">General Information</h1>
          <Label>Basic information about employee</Label>
        </div>
        <div className="ml-auto flex space-x-4">
          {edit ? (
            <>
              <Button variant={"outline"} onClick={() => setEdit(false)}>
                Cancel
              </Button>
              <Button variant={"default"} type="submit" form={formId}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button variant={"outline"} onClick={() => setEdit(true)}>
              <PenLine />
              <span>Edit Information</span>
            </Button>
          )}
        </div>
      </div>

      <>
        {edit ? (
          <FormComp
            id={formId}
            onSubmit={(val) => {
              setEdit(false)
              onSubmit && onSubmit(val)
            }}
            bareForm={bareForm}
          />
        ) : (
          <>
            <Card>
              <CardHeader className="grid grid-cols-[auto,200px]">
                <CardTitle>Personal Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="grid grid-cols-[200px,auto] gap-6">
                    <p className="text-muted-foreground">Full Name</p>
                    <p>
                      {`${employee?.first_name || ""} ${employee?.middle_name || ""} ${employee?.last_name || ""}`.trim() ||
                        "-"}
                    </p>
                    <p className="text-muted-foreground">Gender</p>
                    <p>{employee?.gender || "-"}</p>
                    <p className="text-muted-foreground">Date of Birth</p>
                    <p>
                      {(employee?.date_of_birth &&
                        format(employee?.date_of_birth, "P")) ||
                        "-"}
                    </p>
                    <p className="text-muted-foreground">Email</p>
                    <p>{employee?.work_email || "-"}</p>
                    <p className="text-muted-foreground">Phone Number</p>
                    <p>{employee?.phone || "-"}</p>
                    <p className="text-muted-foreground">Country</p>
                    <p>{employee?.address?.country || "-"}</p>
                    <p className="text-muted-foreground">Marital Status</p>
                    <p>{employee?.marital_status || "-"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="grid grid-cols-[auto,200px]">
                <CardTitle>Address Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="grid grid-cols-[200px,auto] gap-6">
                    <p className="text-muted-foreground">Primary Address</p>
                    <p>
                      {`${employee?.address?.line1 || ""} ${employee?.address?.line2 || ""}`.trim() ||
                        "-"}
                    </p>
                    <p className="text-muted-foreground">City</p>
                    <p>{employee?.address?.city || "-"}</p>
                    <p className="text-muted-foreground">State/Province</p>
                    <p>{employee?.address?.state || "-"}</p>
                    <p className="text-muted-foreground">Country</p>
                    <p>{employee?.address?.country || "-"}</p>
                    <p className="text-muted-foreground">Zip Code</p>
                    <p>{employee?.address?.zip_code || ""}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="grid grid-cols-[auto,200px]">
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                {(employee?.emergency_contacts?.length || 0) > 0 ? (
                  employee?.emergency_contacts?.map((e, i) => (
                    <div key={i}>
                      <div className="grid grid-cols-[200px,auto] gap-6">
                        <p className="text-muted-foreground">Full Name</p>
                        <p>{e?.name || "-"}</p>
                        <p className="text-muted-foreground">Phone Number</p>
                        <p>{e?.phone || "-"}</p>
                        <p className="text-muted-foreground">Relation</p>
                        <p>{e?.relation || "-"}</p>
                      </div>
                      {i < employee?.emergency_contacts.length - 1 && (
                        <Separator className="my-6" />
                      )}
                    </div>
                  ))
                ) : (
                  <div>
                    <h1>No Emergency Contacts found...</h1>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </>
    </div>
  )
}
