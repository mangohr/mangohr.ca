import { component, fields, singleton } from "@keystatic/core"

import { btnLink } from "../utils"

export const navigationSingleton = singleton({
  label: "Navigation",
  path: "content/pages/navigation/",
  schema: {
    header: fields.array(btnLink({ defaultValue: "link" }), {
      label: "Header Links",
      itemLabel(props) {
        return `${props.fields.label.value}`
      },
      description: "Add / Edit header links here",
    }),
    footer: fields.array(btnLink({ defaultValue: "link" }), {
      label: "Footer Links",
      itemLabel(props) {
        return `${props.fields.label.value}`
      },
      description: "Add / Edit header links here",
    }),
    copyright_bar: fields.object(
      {
        links: fields.array(btnLink({ defaultValue: "link" }), {
          label: "Links",
          description: "Add / Edit header links here",
          itemLabel(props) {
            return `${props.fields.label.value}`
          },
        }),
      },
      {
        label: "Copyright bar",
      }
    ),
  },
})
