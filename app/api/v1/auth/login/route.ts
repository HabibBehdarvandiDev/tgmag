import { NextRequest, NextResponse } from "next/server";
import {UserLoginSchema} from "@/schema/auth";
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
  const validation = UserLoginSchema.safeParse(body);
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

  const data = validation.data;

  try {
    // Find the user in the database
    const user = await prisma.users.findUnique({
      where: { username: data.username },
    });

    // If user does not exist
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "این کاربر وجود ندارد." },
        { status: 400 }
      );
    }

    // Compare passwords
    const isPasswordsMatch = bcrypt.compare(data.password, user.password);

    // If password is incorrect
    if (!isPasswordsMatch) {
      return NextResponse.json(
        { status: "error", message: "نام کاربری و یا رمز عبور اشتباه است." },
        { status: 400 }
      );
    }

    // Create JWT token
    const token = await createJWT({ user_id: user.id, role_id: user.role_id });

    // Set the token in cookies
    const response = NextResponse.json(
      { status: "success", message: "ورود شما موفقیت آمیز بود." },
      { status: 200 }
    );

    // Set the cookie for the token
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
    // Handle database connection errors or unexpected issues
    return NextResponse.json(
      { status: "error", message: "خطا در اتصال به پایگاه داده." },
      { status: 500 }
    );
  }
}
