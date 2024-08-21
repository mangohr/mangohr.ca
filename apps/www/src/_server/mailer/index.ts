import "server-only"

import { env } from "@/env"
import { SESClient } from "@aws-sdk/client-ses"

export const sesClient = new SESClient({
  credentials: {
    accessKeyId: String(env.SES_ACCESS_KEY),
    secretAccessKey: String(env.SES_SECRET_ACCESS_KEY),
  },
  region: String(env.SES_REGION),
})
