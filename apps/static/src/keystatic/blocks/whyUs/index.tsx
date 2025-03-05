import { fields } from "@keystatic/core"
import { block } from "@keystatic/core/content-components"

import { WhyUsBlock } from "./component"

export const whyUsBlock = block({
  label: "Why Us Block",
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
    return <WhyUsBlock {...value} />
  },
})

export * from "./component"
