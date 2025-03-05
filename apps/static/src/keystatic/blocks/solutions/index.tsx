import { fields } from "@keystatic/core"
import { block } from "@keystatic/core/content-components"

import { SolutionBlock } from "./component"

export const solutionBlock = block({
  label: "Solution Block",
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
    return <SolutionBlock {...value} />
  },
})

export * from "./component"
