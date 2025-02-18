"use server"

import { redirect } from "next/navigation"
import { getEmployee, getOrg } from "@/_server/cache/org"
import { auth } from "@/auth"

import { Member, Permissions, ROLES, RolesWithPermissions } from "./constants"

export async function hasPermission<Resource extends keyof Permissions>(
  orgSlug: string,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
) {
  const session = await auth()
  if (!session?.user) throw Error("Un-authenticated")

  let org
  let employee: Member | null = null
  if (orgSlug) {
    org = await getOrg(orgSlug)
    employee = await getEmployee(org.id, session.user.username)

    if (!employee) {
      return redirect("/access-denied")
    }

    const hasPerm = ((employee.roles as any) || []).some(
      (role: keyof typeof ROLES) => {
        const permission = (ROLES as RolesWithPermissions)[role][resource]?.[
          action
        ]
        if (permission == null) return false
        if (typeof permission === "boolean") return permission
        return data != null && permission(employee!, data)
      }
    )
    if (!hasPerm)
      throw Error(
        `Insufficient permission (${resource}:${action}) on role:${employee.roles.join(",")} employee:${employee.id}`
      )
  }

  return { session: { ...session, employee }, org }
}

//   // USAGE:
//   const user: User = { blockedBy: ["2"], id: "1", roles: ["user"] }
//   const todo: Todo = {
//     completed: false,
//     id: "3",
//     invitedUsers: [],
//     title: "Test Todo",
//     userId: "1",
//   }

//   // Can create a comment
//   hasPermission(user, "comments", "create")

//   // Can view the `todo` Todo
//   hasPermission(user, "todos", "view", todo)

//   // Can view all todos
//   hasPermission(user, "todos", "view")

// hasPermission(null, "org", "create")
