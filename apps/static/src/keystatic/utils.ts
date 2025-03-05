import { fields, GitHubConfig, LocalConfig } from "@keystatic/core"

import { ButtonProps } from "@/components/ui/button"

export const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: {
          owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
        },
      }

export const makePreview = (url: string) => {
  return storage.kind === "github"
    ? `/preview/start?branch={branch}&to=${url}`
    : url
}

export const btnLink = (props: {
  label?: string
  defaultValue?: ButtonProps["variant"]
}) =>
  fields.object(
    {
      label: fields.text({ label: "Label" }),
      type: fields.select({
        label: "Type",
        options: [
          { label: "Default", value: "default" },
          { label: "Secondary", value: "secondary" },
          { label: "Outline", value: "outline" },
          { label: "Link", value: "link" },
        ] satisfies Array<{ label: string; value: ButtonProps["variant"] }>,
        defaultValue: (props.defaultValue as any) || "default",
      }),
      url: fields.url({ label: "Url" }),
    },
    {
      label: props.label || "",
      layout: [9, 3, 12],
    }
  )
