"use client"

import React, { useState } from "react"
import { useEmployee } from "@/context/employee"
import { EmployeeGeneralForm } from "@/forms/employee/general"

export default function EmployeeGeneral() {
  const { employee } = useEmployee()
  return <EmployeeGeneralForm employee={employee} />
}
