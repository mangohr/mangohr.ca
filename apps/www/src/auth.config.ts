import type { NextAuthConfig } from "next-auth"

import { AuthUser } from "./types/db"

export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  // secret: env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    verifyRequest: "/auth/verify",
    newUser: "/onboarding",
  },
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user
      return isAuthenticated
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = (user as unknown as AuthUser).username
      }
      return token
    },
    session: ({ session, token }) => {
      session.user.username = String(token.username)!
      session.user.id = String(token.id)!
      return session
    },
  },

  providers: [],
} satisfies NextAuthConfig
