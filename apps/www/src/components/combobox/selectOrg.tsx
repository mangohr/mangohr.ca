"use client"

import { useEffect, useMemo, useState } from "react"
import { getOrgsComboBox } from "@/_server/actions/combobox"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"

import { DefaultCombobox, DefaultComboBox } from "."

export function SelectOrgs({
  size,
  selected = undefined,
  setSelected,
  disabled,
}: {
  size?: Parameters<typeof DefaultComboBox>[0]["size"]
  selected: string | undefined
  setSelected: (val: string | undefined) => void
  disabled?: boolean
}) {
  const [search, setSearch] = useState(selected || "")
  const [debouncedSearch] = useDebounce(search, 500)

  const { data, isLoading } = useQuery({
    queryKey: ["combobox-orgs", search],
    queryFn: async () => await getOrgsComboBox({ search: debouncedSearch }),
  })

  const handleSelected = (val: DefaultCombobox | null) => {
    setSelected(val?.value || undefined)
  }

  const curr = useMemo(() => {
    return data?.find((d) => d.value === selected) || null
  }, [selected])

  return (
    <DefaultComboBox
      name="Select Organization"
      placeholder="Search Organization"
      data={data}
      loading={isLoading}
      onSearch={setSearch}
      selected={curr}
      setSelected={handleSelected}
      size={size}
      disabled={disabled}
    />
  )
}
