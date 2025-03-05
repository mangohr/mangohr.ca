import { fields } from "@keystatic/core"
import { block } from "@keystatic/core/content-components"

import { DemoVideoBlock } from "./component"

export const demoVideoBlock = block({
  label: "Demo Video Block",
  schema: {
    // label: fields.text({
    //   label: "label",
    //   multiline: true,
    //   defaultValue: "Heading Label",
    // }),
    // title: fields.text({
    //   label: "Title",
    //   multiline: true,
    //   defaultValue: "Title of the heading",
    // }),
    // description: fields.text({
    //   label: "Description",
    //   multiline: true,
    //   defaultValue: "",
    // }),
  },
  ContentView: ({ value }) => {
    return <DemoVideoBlock {...value} />
  },
})

export * from "./component"
