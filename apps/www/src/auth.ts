// src.auth.ts
import { magicLinkTemplate } from "@mhr/mails/emails"
import NextAuth from "next-auth"
import google from "next-auth/providers/google"

import { db } from "./_server/db"
import { KyselyAdapter } from "./_server/db/authAdapter"
import { sendEmail } from "./_server/mailer/send"
import { authConfig } from "./auth.config"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: KyselyAdapter(),
  providers: [
    // **************************************************************
    // added provider
    google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // **************************************************************
    {
      id: "magic-link",
      name: "Email",
      type: "email",
      from: "mango-hr",
      maxAge: 60 * 60 * 24, // Email link will expire in 24 hours
      sendVerificationRequest: async (props) => {
        const user = await db
          .selectFrom("auth.user")
          .select("name")
          .where("email", "=", "email")
          .executeTakeFirst()
        const { subject, text, render } = magicLinkTemplate({
          email: props.identifier,
          link: props.url,
          name: user?.name || "",
        })
        await sendEmail({
          subject,
          text,
          html: render(),
          emails: [props.identifier],
        })
      },
      options: {},
    },
  ],
})
