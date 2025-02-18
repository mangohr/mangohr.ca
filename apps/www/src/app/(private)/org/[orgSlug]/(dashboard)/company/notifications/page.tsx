import React from "react"

import { Label } from "@/components/ui/label"

import { NotificationsForm } from "./form"

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex-1">
          <h1 className="text-xl font-medium">Notifications</h1>
          <Label>Notification of your company.</Label>
        </div>
      </div>
      <NotificationsForm />
    </div>
  )
}
