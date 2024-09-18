import { NextRequest, NextResponse } from "next/server";
import { UserRegisterSchema } from "@/schema/auth";
import prisma from "@/db/db";
import bcrypt from "bcrypt";
import { createJWT } from "@/utils/cookies";

export async function POST(req: NextRequest) {
  let body;

  // Parse the body and handle empty or invalid JSON
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "اطلاعات بدن نمی‌تواند خالی باشد." },
      { status: 400 }
    );
  }

  // Validate the schema
  const validation = UserRegisterSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        status: "error",
        message: "اطلاعات وارد شده معتبر نیست.",
        errors: validation.error.formErrors.fieldErrors,
      },
      { status: 400 }
    );
  }

  // Check if user exists with the same username
  try {
    const isUserExist = await prisma.users.findUnique({
      where: {
        username: validation.data?.username,
      },
    });

    // If the user already exists
    if (isUserExist) {
      return NextResponse.json(
        { status: "error", message: "این کاربر از قبل وجود دارد." },
        { status: 400 }
      );
    }
  } catch (error) {
    // Handle database connection issues
    return NextResponse.json(
      { status: "error", message: "خطا در اتصال به پایگاه داده." },
      { status: 500 }
    );
  }

  // Hash the password
  const hashed_password = await bcrypt.hash(
    validation.data?.password,
    parseInt(process.env.SALT_ROUND!) || 10
  );

  // Create the user in the database
  try {
    const newUser = await prisma.users.create({
      data: {
        first_name: validation.data.first_name,
        last_name: validation.data.last_name,
        username: validation.data.username.toLowerCase(),
        password: hashed_password,
        role_id: 2, // Default role, change if necessary
      },
    });

    const userRole = await prisma.roles.findUnique({
      where: {
        id: newUser.role_id!,
      },
    });

    // Create JWT token
    const token = await createJWT({
      user_id: newUser.id,
      role_id: newUser.role_id,
      user_role: userRole?.role_name,
    });

    // Set the token in cookies and return success response
    const response = NextResponse.json(
      {
        status: "success",
        message: "حساب کاربری شما با موفقیت ایجاد شد.",
        user: {
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          username: newUser.username,
          role_id: newUser.role_id,
          is_active: newUser.is_active,
          is_verified: newUser.is_verified,
        },
      },
      { status: 201 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    // Handle unexpected errors during user creation or database connection
    return NextResponse.json(
      { status: "error", message: "خطا در هنگام ایجاد کاربر." },
      { status: 500 }
    );
  }
}
