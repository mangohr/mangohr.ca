import { SendEmailCommand } from "@aws-sdk/client-ses"

import { sesClient } from "."

export const sendEmail = async ({
  subject,
  text,
  html,
  emails,
}: {
  subject: string
  text: string
  html: string
  emails: string[]
}) => {
  const command = new SendEmailCommand({
    Source: "Mango HR <no-reply@lipy.ai>",
    Destination: {
      ToAddresses: emails,
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: text,
        },
        Html: {
          Charset: "UTF-8",
          Data: html,
        },
      },
    },
    ReplyToAddresses: ["team@lipy.ai"],
  })

  return await sesClient.send(command).catch((err) => {
    throw Error(`SES Mailer Error: ${err}`)
  })
}
