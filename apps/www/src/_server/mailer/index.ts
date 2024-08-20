import "server-only"

import { SESClient } from '@aws-sdk/client-ses'

export const sesClient = new SESClient({
    credentials: {
        accessKeyId: String(process.env.SES_ACCESS_KEY),
        secretAccessKey: String(process.env.SES_SECRET_ACCESS_KEY),
    },
    region: String(process.env.SES_REGION),
})
