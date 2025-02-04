import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    WWW_URL: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    AUTH_URL: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    REDIS_URL: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    SES_ACCESS_KEY: z.string().min(1),
    SES_SECRET_ACCESS_KEY: z.string().min(1),
    SES_REGION: z.string().min(1),
    AWS_ACCESS_KEY: z.string().min(1),
    AWS_SECRET_KEY: z.string().min(1),
    S3_UPLOAD_BUCKET: z.string().min(1),
    S3_UPLOAD_REGION: z.string().min(1),
    NODE_ENV: z.string().optional(),
    STRIPE_SECRET_KEY: z.string(),
    NOTIFY_EMAILS: z.array(z.string()),
  },
  client: {
    // NEXT_PUBLIC_STRIPE_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),

    // NEXT_PUBLIC_PRICE_ID_BASIC: z.string().min(1),
    // NEXT_PUBLIC_PRICE_ID_PREMIUM: z.string().min(1),
    // NEXT_PUBLIC_STRIPE_MANAGE_URL: z.string().min(1),
  },
  runtimeEnv: {
    NOTIFY_EMAILS:
      process.env.NOTIFY_EMAILS?.split(",").map((email) => email.trim()) ||
      ([] as any),

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    WWW_URL: process.env.WWW_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    REDIS_URL: process.env.REDIS_URL,
    SES_ACCESS_KEY: process.env.SES_ACCESS_KEY,
    SES_SECRET_ACCESS_KEY: process.env.SES_SECRET_ACCESS_KEY,
    SES_REGION: process.env.SES_REGION,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },

  skipValidation: true,
})
