import { collection, fields } from "@keystatic/core"

import {
  demoVideoBlock,
  headingBlock,
  heroBlock,
  solutionBlock,
  whyUsBlock,
} from "../blocks"
import { makePreview } from "../utils"

const components = {
  heroBlock,
  headingBlock,
  solutionBlock,
  demoVideoBlock,
  whyUsBlock,
}

export const pagesCollection = collection({
  label: "Pages",
  path: "content/pages/*",
  previewUrl: makePreview("/pages/{slug}"),
  columns: ["description", "publishedDate"],
  slugField: "title",
  entryLayout: "content",
  format: {
    contentField: "content",
  },
  schema: {
    title: fields.slug({
      name: {
        label: "Title",
        validation: {
          length: {
            min: 1,
            max: 60,
          },
        },
      },
    }),
    description: fields.text({
      label: "Description",
      multiline: true,
      validation: {
        length: {
          min: 1,
          max: 160,
        },
      },
    }),
    image: fields.image({
      label: "Image",
      directory: "public/uploads/page",
      publicPath: "/uploads/page",
    }),
    layout: fields.select({
      label: "Page Layout",
      description: "Layout of this page",
      options: [
        { label: "Full Width", value: "full" },
        { label: "Container", value: "container" },
        { label: "Post", value: "post" },
      ],
      defaultValue: "container",
    }),
    publishedDate: fields.datetime({
      label: "Published Date",
      defaultValue: { kind: "now" },
    }),
    content: fields.markdoc({
      label: "Content",
      components,
      options: {
        image: {
          directory: "/public/uploads/images/",
          publicPath: "/uploads/images/",
          transformFilename(originalFilename) {
            return originalFilename
          },
        },
      },
    }),
  },
})
