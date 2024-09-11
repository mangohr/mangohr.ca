import "@tanstack/react-table"

export type ReplaceUndefinedWithNull<T> = T extends undefined ? null : T
export type ToNullProps<T> = {
  [P in keyof T]-?: ReplaceUndefinedWithNull<T[P]>
}

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    headerClassName?: string
    cellClassName?: string
  }
  interface TableMeta<any> {}
}
