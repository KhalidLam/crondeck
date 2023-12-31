/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import InstagramProvider from "next-auth/providers/instagram";

import { env } from "@/env.mjs";
import { db } from "@/server/db";

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

  interface User {
    id: string;
    //   // ...other properties
    //   // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  session: { strategy: "jwt" },
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
    FacebookProvider({
      name: "facebook",
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: env.INSTAGRAM_CLIENT_ID,
      clientSecret: env.INSTAGRAM_CLIENT_SECRET,
      // token: {
      //   url: "https://api.instagram.com/oauth/access_token",
      //   async request(context: {
      //     provider: {
      //       clientId: string;
      //       clientSecret: string;
      //       callbackUrl: string;
      //       token: { url: string };
      //     };
      //     params: { code: string };
      //   }) {
      //     const {
      //       provider,
      //       params: { code },
      //     } = context;

      //     const body = new URLSearchParams([
      //       ["grant_type", "authorization_code"],
      //       ["code", code],
      //       ["client_id", provider.clientId],
      //       ["client_secret", provider.clientSecret],
      //       ["redirect_uri", provider.callbackUrl],
      //     ]);
      //     const response = await (
      //       await fetch(provider.token.url, {
      //         method: "POST",
      //         body,
      //       })
      //     ).json();
      //     const { access_token } = response;
      //     return { tokens: { access_token } };
      //   },
      // },
    }),
    LinkedInProvider({
      name: "linkedin",
      clientId: env.LINKEDIN_CLIENT_ID,
      clientSecret: env.LINKEDIN_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      profile(
        profile: {
          sub: string;
          name: string;
          email: string;
          picture: string;
        },
        _,
      ) {
        const defaultImage =
          "https://cdn-icons-png.flaticon.com/512/174/174857.png";
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture ?? defaultImage,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
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
