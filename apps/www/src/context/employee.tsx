"use client"

import { createContext, ReactNode, useContext, useOptimistic } from "react"
import { getEmployeeData } from "@/_server/handlers/employee"

const Context = createContext<{
  employee: Awaited<ReturnType<typeof getEmployeeData>> | null
  setOptimisticEmployee: (
    v: Awaited<ReturnType<typeof getEmployeeData>> | null
  ) => void
}>({ employee: null, setOptimisticEmployee: () => {} })

export const EmployeeProvider = ({
  children,
  data,
}: {
  children: ReactNode
  data: Awaited<ReturnType<typeof getEmployeeData>> | null
}) => {
  const [employee, setOptimisticEmployee] = useOptimistic(data)
  return (
    <Context.Provider value={{ employee, setOptimisticEmployee }}>
      {children}
    </Context.Provider>
  )
}

export const useEmployee = () => useContext(Context)
