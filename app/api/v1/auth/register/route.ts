import { NextRequest, NextResponse } from "next/server";
import { UserRegisterSchema } from "./schema";
import prisma from "@/db/db";
import bcrypt from "bcrypt";

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

  

  return NextResponse.json(hashed_password, { status: 200 });
}
