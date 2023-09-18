import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import EmailProvider from "next-auth/providers/email";
// import { uid } from "uid";

import { env } from "@/env.mjs";
import { db } from "@/server/db";

import emailClient from "@/lib/email-client";
import { EmailTemplate } from "@/components/email-template";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db),
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    EmailProvider({
      // id: "email",
      sendVerificationRequest: async function ({ identifier: email, url }) {
        const { host } = new URL(url);

        // const uniqId = uid() as string;

        await emailClient.emails.send({
          from: "SmPoster <no-reply@smposter.to>",
          to: [email],
          subject: "Welcome To SMPoster",
          react: EmailTemplate({ firstName: "John" }),
          text: `Sign in to ${host}\n${url}\n\n`,
          // headers: { "X-Entity-Ref-ID": uniqId },
        });
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/login",
  //   verifyRequest: "/auth/verify-email",
  //   error: "/auth/error",
  // },
  // events: {
  //   createUser(message) {
  //     const params = {
  //       user: {
  //         name: message.user.name,
  //         email: message.user.email,
  //       },
  //     };
  //     // await sendWelcomeEmail(params);
  //   },
  // },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
