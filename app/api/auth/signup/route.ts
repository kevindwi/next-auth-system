import { NextRequest, NextResponse } from "next/server";

import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/bcrypt'


export async function POST(
  req: NextRequest,
  res: NextResponse
) {
		const newUser = await req.json();

		const userExists = await prisma.users.findUnique({
			where: {
				email: newUser.email,
			}
		})

		if (userExists) {
      return NextResponse.json({
					success: false,
					message: 'A user with the same email already exists!',
					userExists: true,
				},
				{ status: 422 }
      );
    }

    newUser.password = hashPassword(newUser.password);

		const user = await prisma.users.create({
			data: {
				name: newUser.name,
				username: newUser.username,
				email: newUser.email,
				password: newUser.password,
			},
		})

		if (user) {
			return NextResponse.json({ success: true, message: 'User signed up successfuly' });
		} else {
			return null;
		}
}
