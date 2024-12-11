"use server"

import { getEmployee, getOrg } from "@/_server/cache/org"
import { auth } from "@/auth"

import {
  OrgsAttendance,
  OrgsDepartment,
  OrgsEmployee,
  OrgsList,
  OrgsOffice,
  OrgsStorage,
  OrgsTimeOff,
  OrgsWorkSchedule,
} from "@/types/db"

type Role = "admin" | "moderator" | "user"
type Member = Awaited<ReturnType<typeof getEmployee>>

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((member: Member, data: Permissions[Key]["dataType"]) => boolean)

type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>
    }>
  }>
}

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
      throw Error("You are not an employee of this company.")
    }

    employee.roles = ["admin"]

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
    if (!hasPerm) throw Error(`Insufficient permission (${resource}:${action})`)
  }

  return { session: { ...session, employee }, org }
}

type Permissions = {
  org: {
    dataType: OrgsList
    action: "view" | "create" | "update" | "delete"
  }
  orgList: {
    dataType: OrgsEmployee
    action: "view"
  }
  orgDashboard: {
    dataType: OrgsEmployee
    action: "view"
  }
  employeeList: {
    dataType: OrgsEmployee
    action: "view"
  }
  employeeInvite: {
    dataType: OrgsEmployee
    action: "view" | "create" | "delete"
  }

  employeePersonal: {
    dataType: OrgsEmployee
    action: "view" | "update"
  }
  employeeJob: {
    dataType: OrgsEmployee
    action: "view" | "create"
  }
  employeeRole: {
    dataType: OrgsEmployee
    action: "view" | "update"
  }
  attendance: {
    dataType: OrgsAttendance
    action: "view" | "create" | "update" | "delete"
  }
  attendanceList: {
    dataType: OrgsAttendance
    action: "view"
  }
  department: {
    dataType: OrgsDepartment
    action: "view" | "update" | "delete"
  }
  documents: {
    dataType: OrgsStorage
    action: "view" | "create" | "delete"
  }
  office: {
    dataType: OrgsOffice
    action: "view" | "create" | "update" | "delete"
  }
  timeoff: {
    dataType: OrgsTimeOff
    action: "view" | "create" | "update" | "delete"
  }
  workSchedule: {
    dataType: OrgsWorkSchedule
    action: "view" | "update" | "delete"
  }
}

const ROLES = {
  admin: {
    org: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    orgDashboard: {
      view: true,
    },
    orgList: {
      view: false, /// not working
    },
    employeeList: {
      view: true,
    },
    employeeInvite: {
      view: true,
      create: true,
      delete: true,
    },
    employeePersonal: {
      view: true,
      update: true,
    },
    employeeJob: {
      view: true,
      create: true,
    },
    employeeRole: {
      view: true,
      update: true,
    },
    attendance: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    attendanceList: {
      view: true,
    },
    department: {
      view: true,
      update: true,
      delete: true,
    },
    documents: {
      view: true,
      create: true,
      delete: true,
    },
    office: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    timeoff: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    workSchedule: {
      view: true,
      update: true,
      delete: true,
    },
  },
  moderator: {
    org: {
      view: false,
      create: false,
      update: false,
      delete: false,
    },
    orgList: {
      view: false,
    },
    orgDashboard: {
      view: true,
    },
    employeeList: {
      view: false,
    },
    employeeInvite: {
      view: false,
      create: false,
      delete: false,
    },
    employeePersonal: {
      view: false,
      update: false,
    },
    employeeJob: {
      view: false,
      create: false,
    },
    employeeRole: {
      view: false,
      update: false,
    },
    attendance: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    attendanceList: {
      view: false,
    },
    department: {
      view: false,
      update: false,
      delete: false,
    },
    documents: {
      view: false,
      create: false,
      delete: false,
    },
    office: {
      view: false,
      create: false,
      update: false,
      delete: false,
    },
    timeoff: {
      view: false,
      create: false,
      update: false,
      delete: false,
    },
    workSchedule: {
      view: false,
      update: false,
      delete: false,
    },
  },
  user: {
    org: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    orgList: {
      view: true,
    },
    orgDashboard: {
      view: true,
    },
    employeeList: {
      view: true,
    },
    employeeInvite: {
      view: true,
      create: true,
      delete: true,
    },
    employeePersonal: {
      view: true,
      update: true,
    },
    employeeJob: {
      view: true,
      create: true,
    },
    employeeRole: {
      view: true,
      update: true,
    },
    attendance: {
      view: true,
      create: true,
    },
    attendanceList: {
      view: true,
    },
    department: {
      view: true,
      update: true,
      delete: true,
    },
    documents: {
      view: true,
      create: true,
      delete: true,
    },
    office: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    timeoff: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    workSchedule: {
      view: true,
      update: true,
      delete: true,
    },
    //   todos: {
    //     view: (user, todo) => !user.blockedBy.includes(todo.userId),
    //     create: true,
    //     update: (user, todo) =>
    //       todo.userId === user.id || todo.invitedUsers.includes(user.id),
    //     delete: (user, todo) =>
    //       (todo.userId === user.id || todo.invitedUsers.includes(user.id)) &&
    //       todo.completed,
    //   },
  },
} as const satisfies RolesWithPermissions

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
