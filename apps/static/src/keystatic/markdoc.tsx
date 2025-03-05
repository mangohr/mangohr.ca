import React from "react"
import Markdoc, { Config, Node, SchemaAttribute } from "@markdoc/markdoc"

import {
  DemoVideoBlock,
  demoVideoBlock,
  HeadingBlock,
  headingBlock,
  HeroBlock,
  heroBlock,
  SolutionBlock,
  solutionBlock,
  WhyUsBlock,
  whyUsBlock,
} from "./blocks"

export class Any {
  validate() {
    return []
  }

  transform(value: any) {
    return value
  }
}

// Helper to convert Keystatic schema to Markdoc attributes
export function convertKeystaticToMarkdoc(
  keystaticSchema: Record<string, any>
) {
  const attributes: Record<string, SchemaAttribute> = {}
  for (const [key, field] of Object.entries(keystaticSchema)) {
    attributes[key] = { type: Any }
  }
  return attributes
}

export const RenderMarkdown = ({ node }: { node: Node }) => {
  const config: Config = {
    tags: {
      heroBlock: {
        render: "HeroBlock",
        attributes: convertKeystaticToMarkdoc(heroBlock.schema),
      },
      headingBlock: {
        render: "HeadingBlock",
        attributes: convertKeystaticToMarkdoc(headingBlock.schema),
      },
      demoVideoBlock: {
        render: "DemoVideoBlock",
        attributes: convertKeystaticToMarkdoc(demoVideoBlock.schema),
      },
      solutionBlock: {
        render: "SolutionBlock",
        attributes: convertKeystaticToMarkdoc(solutionBlock.schema),
      },
      whyUsBlock: {
        render: "WhyUsBlock",
        attributes: convertKeystaticToMarkdoc(whyUsBlock.schema),
      },
    },
  }

  const errors = Markdoc.validate(node, config)
  if (errors.length) {
    console.error(errors)
    throw new Error("Invalid content")
  }
  const renderable = Markdoc.transform(node, config)

  return Markdoc.renderers.react(renderable, React, {
    components: {
      HeroBlock,
      HeadingBlock,
      SolutionBlock,
      DemoVideoBlock,
      WhyUsBlock,
    },
  })
}
