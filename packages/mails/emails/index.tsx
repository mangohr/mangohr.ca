import { render } from "@react-email/components"

import magicLinkTemplate from "./magicLinkTemplate"
import newEmployeeTemplate from "./newEmployee"
import newOrgTemplate from "./newOrg"

export const magicLinkRenderer = (
  props: Parameters<typeof magicLinkTemplate>[0]
) => {
  return {
    subject: `Sign in to MangoHR using this magic link.`,
    text: render(magicLinkTemplate(props), { plainText: true }),
    html: render(magicLinkTemplate(props)),
  }
}

export const newEmployeeEmailRenderer = (
  props: Parameters<typeof newEmployeeTemplate>[0]
) => {
  return {
    subject: `Welcome ${props.employee.name} to ${props.company.name}`,
    text: render(newEmployeeTemplate(props), { plainText: true }),
    html: render(newEmployeeTemplate(props)),
  }
}

export const newOrgEmailRenderer = (
  props: Parameters<typeof newOrgTemplate>[0]
) => {
  return {
    subject: `New company (${props.company.name}) has been added on MangoHR`,
    text: render(newOrgTemplate(props), { plainText: true }),
    html: render(newOrgTemplate(props)),
  }
}
