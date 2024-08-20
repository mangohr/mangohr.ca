import { auth } from "@/auth"

import { getEmployee, getOrg } from "../cache/org"

export const hasPerm = async (props?: { scope?: string; orgSlug?: string }) => {
  const session = await auth()
  if (!session?.user) throw Error("Un-authenticated")

  let org, employee
  if (props?.orgSlug) {
    org = await getOrg(props.orgSlug)
    employee = await getEmployee(org.id, session.user.username)

    if (!employee) {
      throw Error("You are not an employee of this company.")
    }
    if (
      props?.scope &&
      (!employee.scopes || !employee.scopes?.includes(props.scope!))
    ) {
      throw Error("You don't have sufficient permissions")
    }
  }

  return { session: { ...session, employee }, org }
}
