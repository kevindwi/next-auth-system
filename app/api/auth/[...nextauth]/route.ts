import NextAuth from 'next-auth';

import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

import prisma from '@/lib/prisma'
import { validatePassword } from '@/lib/bcrypt'

export const authOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.username || !credentials.password) {
          return null;
        }
      
        const user = await prisma.users.findUnique({
          where: {
            username: credentials.username,
          }
        })

        const isPasswordMatch = validatePassword(credentials.password, user.password);

        if (!isPasswordMatch) {
          return null;
        }

        if (user) {
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            image: user.image,
          };
        } else {
          return null
        }
      }
    }),
    
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        // token.id = profile.id
      }
      
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      session.user.id = token.id
      
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
	session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
