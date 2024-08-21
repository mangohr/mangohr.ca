import { render } from "@react-email/components"

import magicLinkTemplate from "./magicLinkTemplate"

export const magicLinkRenderer = (
  props: Parameters<typeof magicLinkTemplate>[0]
) => {
  return {
    subject: `Sign in to MangoHR using this magic link.`,
    text: render(magicLinkTemplate(props), { plainText: true }),
    html: render(magicLinkTemplate(props)),
  }
}
