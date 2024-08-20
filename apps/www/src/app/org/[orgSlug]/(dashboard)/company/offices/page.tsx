import { getOffices } from "@/_server/handlers/org"

import OfficePage from "./components"

export default async function Page() {
  const offices = await getOffices()

  return <OfficePage data={offices} />
}
