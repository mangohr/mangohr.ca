import { fields } from "@keystatic/core"
import { block } from "@keystatic/core/content-components"

import { HeadingBlock } from "./component"

export const headingBlock = block({
  label: "Heading Block",
  schema: {
    label: fields.text({
      label: "label",
      multiline: true,
      defaultValue: "Heading Label",
    }),
    title: fields.text({
      label: "Title",
      multiline: true,
      defaultValue: "Title of the heading",
    }),
    description: fields.text({
      label: "Description",
      multiline: true,
      defaultValue: "",
    }),
  },
  ContentView: ({ value }) => {
    return <HeadingBlock {...value} />
  },
})

export * from "./component"
