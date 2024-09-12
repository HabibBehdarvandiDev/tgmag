import { NextRequest, NextResponse } from "next/server";
import { UserRegisterSchema } from "./schema";
import prisma from "@/db/db";
import bcrypt from "bcrypt";
import { createJWT } from "@/utils/cookies";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: "body can'ot be Empty !" },
      { status: 400 }
    );
  }

  const validation = UserRegisterSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.formErrors.fieldErrors);
  }

  // check user exist with username
  try {
    const isUserExist = await prisma.users.findUnique({
      where: {
        username: validation.data?.username,
      },
    });

    if (isUserExist) {
      return NextResponse.json(
        { error: "user already exist !" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "errro while connecting to Database!" },
      { status: 400 }
    );
  }

  // hash the password
  const hashed_password = await bcrypt.hash(
    validation.data?.password,
    parseInt(process.env.SALT_ROUND!) || 10
  );

  try {
    const newUser = await prisma.users.create({
      data: {
        first_name: validation.data.first_name,
        last_name: validation.data.last_name,
        username: validation.data.username,
        password: hashed_password,
        role_id: 2, // change when the role id was chnaged!
      },
    });

    //create token
    const token = await createJWT({
      user_id: newUser.id,
      role_id: newUser.role_id,
    });

    req.cookies.set(token, token);

    return NextResponse.json(
      { status: "ok", message: "user created." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "errro while connecting to Database!" },
      { status: 400 }
    );
  }
}
