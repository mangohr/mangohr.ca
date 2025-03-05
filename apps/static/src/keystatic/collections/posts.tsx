import { collection, fields } from "@keystatic/core"

import { makePreview } from "../utils"

export const postCollection = collection({
  label: "Posts",
  path: "content/posts/*/",
  previewUrl: makePreview("/posts/{slug}"),
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
          length: { min: 1, max: 60 },
        },
      },
    }),
    description: fields.text({
      label: "Description",
      multiline: true,

      validation: { length: { min: 1, max: 170 } },
    }),

    image: fields.image({
      label: "Cover Image",
      directory: "public/uploads/post",
      publicPath: "/uploads/post",
    }),

    publishedDate: fields.datetime({
      label: "Published Date",
      defaultValue: { kind: "now" },
    }),
    authors: fields.array(
      fields.relationship({
        label: "Post Authors",
        collection: "authors",
      }),
      {
        label: "Authors",
        itemLabel: (props) => props.value || "Please select an author",
      }
    ),
    related: fields.array(
      fields.relationship({
        label: "Related Posts",
        collection: "posts",
      }),
      {
        validation: {
          length: { max: 4 },
        },
        label: "Related Posts",
        itemLabel: (props) => props.value || "Please select a post",
      }
    ),
    content: fields.markdoc({
      label: "Content",
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
