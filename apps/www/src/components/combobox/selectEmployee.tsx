"use client"

import { useMemo, useState } from "react"
import { getEmployeesComboBox } from "@/_server/actions/combobox"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"

import { DefaultCombobox, DefaultComboBox } from "."

export function SelectEmployee({
  size,
  selected = undefined,
  setSelected,
}: {
  size?: Parameters<typeof DefaultComboBox>[0]["size"]
  selected: string | undefined
  setSelected: (val: string | undefined) => void
}) {
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebounce(search, 500)

  const { data, isLoading } = useQuery({
    queryKey: ["combobox-employees", search],
    queryFn: async () =>
      await getEmployeesComboBox({ search: debouncedSearch }),
  })

  const handleSelected = (val: DefaultCombobox | null) => {
    setSelected(val?.value || undefined)
  }

  const curr = useMemo(() => {
    return data?.find((d) => d.value === selected) || null
  }, [selected])

  return (
    <DefaultComboBox
      name="Select Employee"
      placeholder="Search Employee"
      data={data}
      loading={isLoading}
      onSearch={setSearch}
      selected={curr}
      setSelected={handleSelected}
      size={size}
    />
  )
}
