import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "./db";
import { loginSchema } from "./validation/auth";

const oauthProviders = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  oauthProviders.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  );
}

if (process.env.APPLE_CLIENT_ID && process.env.APPLE_CLIENT_SECRET) {
  oauthProviders.push(
    Apple({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET
    })
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  session: { strategy: "database" },
  providers: [
    Credentials({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email }
        });

        if (!user || !user.passwordHash || user.deletedAt || user.isDisabled) {
          return null;
        }

        const match = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!match) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    }),
    ...oauthProviders
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async signIn({ user }) {
      const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
      if (!dbUser || dbUser.deletedAt || dbUser.isDisabled) {
        return false;
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    }
  },
  events: {
    async signIn({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
      });
    }
  }
});
