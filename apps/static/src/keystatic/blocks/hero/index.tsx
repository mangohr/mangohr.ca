import { fields } from "@keystatic/core"
import { block } from "@keystatic/core/content-components"

import { btnLink } from "../../utils"
import { HeroBlock } from "./component"

export const heroBlock = block({
  label: "Hero Block",
  schema: {
    title: fields.text({
      label: "Title",
      multiline: true,
      defaultValue: "Hire, Train, Retain\nAll in One Place",
    }),

    description: fields.text({
      label: "Description",
      multiline: true,
      defaultValue:
        "We know what you’re thinking, another HR software? But I promise we’re different - scroll down to see all our amazing features and what sets us apart. I forgot to mention, our CoreHR package is Free Forever!",
    }),
    button_1: btnLink({ label: "Hero Button 1" }),
    button_2: btnLink({ label: "Hero Button 2", defaultValue: "outline" }),
  },
  ContentView: ({ value }) => {
    return <HeroBlock {...value} />
  },
})

export * from "./component"
