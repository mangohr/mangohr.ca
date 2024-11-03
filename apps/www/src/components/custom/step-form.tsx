"use client"

import React, { Suspense, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { parseAsString, useQueryState } from "nuqs"
import { useForm } from "react-hook-form"
import z, { ZodType } from "zod"
import { create } from "zustand"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { Label } from "../ui/label"

type Store = {
  formData: any
  setFormData: (v: any) => void
}

type Schema = Record<
  string,
  {
    title: string
    validate: ZodType<any, any, any>
    component: React.ReactNode
    defaultValues: any
  }
>

const useStore = create<Store>((set) => ({
  formData: {},
  setFormData: (data) =>
    set((s) => {
      return { formData: { ...s.formData, ...data } }
    }),
}))

export function MultiStepForm(props: {
  schema: Schema
  onSubmit: (val: any) => void
}) {
  return (
    <Suspense>
      <FormComp {...props} />
    </Suspense>
  )
}

export function FormComp({
  schema,
  onSubmit,
}: {
  schema: Schema
  onSubmit: (val: any) => void
}) {
  const stepKeys = Object.keys(schema)

  const { setFormData, formData } = useStore()

  const [activeStep, setActiveStep] = useQueryState(
    "step",
    parseAsString.withDefault(stepKeys[0])
  )

  const [errorStep, setErrorStep] = useState<string | undefined>(undefined)

  const activeIdx = stepKeys.indexOf(activeStep)
  const totalSteps = stepKeys.length

  const activeForm = schema[activeStep as any]

  const canPrev = activeIdx > 0
  const canNext = activeIdx < totalSteps - 1
  const isLast = activeIdx >= totalSteps - 1

  const form = useForm<z.infer<typeof activeForm.validate>>({
    resolver: zodResolver(activeForm?.validate),
    defaultValues: activeForm?.defaultValues,
  })

  useEffect(() => {
    if (activeIdx === -1) setActiveStep(stepKeys[0])
    return
  }, [activeIdx])

  useEffect(() => {
    if (!errorStep) {
      const values = formData[activeStep]
      form.reset(values || activeForm?.defaultValues || {})
    }

    if (errorStep === activeStep && form) form.trigger()
  }, [errorStep, activeStep, form])

  const changePage = (val: "prev" | "next") => {
    if (val === "prev" && canPrev) {
      setActiveStep(stepKeys[activeIdx - 1])
    }
    if (val === "next" && canNext) {
      setActiveStep(stepKeys[activeIdx + 1])
    }
  }

  const validateOthers = async () => {
    for (let i = 0; i < stepKeys.length; i++) {
      // Break if page is after or equal active step
      if (i >= activeIdx) {
        break
      }
      const f = schema[stepKeys[i] as any]
      const v = formData[stepKeys[i]]
      const p = await f.validate.safeParseAsync(v)
      // Fallback if invalid zod result
      if (!p.success) {
        setActiveStep(stepKeys[i])
        setErrorStep(stepKeys[i])
        break
      }
    }
  }

  const handleSubmit = form.handleSubmit(async (val) => {
    await validateOthers()
    const currVal = { [activeStep]: val }
    setFormData(currVal)

    isLast ? onSubmit({ ...formData, ...currVal }) : changePage("next")
  })

  useEffect(() => {
    validateOthers()
  }, [])

  if (activeIdx === -1) return null

  return (
    <div className="">
      <div className="my-8 flex items-end justify-between">
        <div>
          <Label>
            STEP {activeIdx + 1} OF {totalSteps}
          </Label>
          <h1 className="text-2xl">{activeForm?.title}</h1>
        </div>
        <div className="flex space-x-2">
          {Array(totalSteps)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={cn(
                  "bg-border size-6 rounded-md",
                  activeIdx === i && "bg-primary"
                )}
              />
            ))}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="">
            {activeForm?.component && activeForm.component}
          </div>
          <div className="flex justify-end space-x-4">
            {canPrev && (
              <Button
                variant={"outline"}
                type="button"
                onClick={() => changePage("prev")}
              >
                Previous
              </Button>
            )}
            <Button>{isLast ? "Submit" : `${"Continue"} `}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
