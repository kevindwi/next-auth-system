"use server";
import NextAuth, { getServerSession } from "next-auth"

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const authUserSession = async() => {
    const session = await getServerSession(authOptions)
    // console.log(session)
    return session?.user
}

export default NextAuth(authOptions)
