import { getEmployee } from "@/_server/cache/org"
import { roles } from "@/constants/roles"

import {
  OrgsAttendance,
  OrgsDepartment,
  OrgsEmployee,
  OrgsList,
  OrgsOffice,
  OrgsOnboarding,
  OrgsStorage,
  OrgsTimeOff,
  OrgsWorkSchedule,
} from "@/types/db"

export type Role = keyof typeof roles
export type Member = Awaited<ReturnType<typeof getEmployee>>

export type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((member: Member, data: Permissions[Key]["dataType"]) => boolean)

export type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>
    }>
  }>
}

export type Permissions = {
  userOnboard: {
    dataType: OrgsOnboarding
    action: "create"
  }
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

export const ROLES = {
  owner: {
    userOnboard: {
      create: true,
    },
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
  admin: {
    userOnboard: {
      create: true,
    },
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
  manager: {
    userOnboard: {
      create: true,
    },
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
  hr: {
    userOnboard: {
      create: true,
    },
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
  employee: {
    userOnboard: {
      create: true,
    },
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
