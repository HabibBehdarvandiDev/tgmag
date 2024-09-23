import prisma from "@/db/db";
import { UserRegisterSchema } from "@/schema/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const users = await prisma.users.findMany({});

    if (!users) {
      return NextResponse.json({
        status: "error",
        mesasge: "هیچ کابری در دیتابیس وجود ندارد!",
      });
    }

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({
      status: "error",
      mesasge: "مشکلی هنگام ایجاد ارتباط با سرور بوجود آمد!",
    });
  }
}

export async function POST(request: NextRequest) {
  let usersBody;

  // check the body for Array of users
  try {
    usersBody = await request.json();
    if (!Array.isArray(usersBody)) {
      return NextResponse.json(
        {
          status: "error",
          message: "اطلاعات باید به صورت آرایه‌ای از کاربران باشد.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "اطلاعات بدن نمی‌تواند خالی باشد." },
      { status: 400 }
    );
  }

  // Store the processed users to insert later
  const usersToCreate = [];

  // Loop through each user in the request body
  for (let userBody of usersBody) {
    // validate each user body request
    const validation = UserRegisterSchema.safeParse(userBody);

    //handle validation error
    if (!validation.success) {
      return NextResponse.json(
        {
          status: "error",
          message: "اطلاعات یکی از کاربران معتبر نیست.",
          errors: validation.error.formErrors.fieldErrors,
        },
        { status: 400 }
      );
    }

    const { username, email, phone_number, password } = validation.data;

    // Check if user exists with the same username, email or phone number
    const [isUserExist, isEmailExist, isPhoneNumberExist] = await Promise.all([
      prisma.users.findUnique({ where: { username: username.toLowerCase() } }),
      email ? prisma.users.findFirst({ where: { email } }) : null,
      phone_number ? prisma.users.findFirst({ where: { phone_number } }) : null,
    ]);

    // handle exist Errors
    if (isUserExist || isEmailExist || isPhoneNumberExist) {
      return NextResponse.json(
        {
          status: "error",
          message: `کاربری با این ${
            isUserExist ? "نام کاربری" : isEmailExist ? "ایمیل" : "شماره تلفن"
          } وجود دارد.`,
          user: {
            username: isUserExist ? isUserExist.username : null,
            email: isEmailExist ? isEmailExist.email : null,
            phone_number: isPhoneNumberExist
              ? isPhoneNumberExist.phone_number
              : null,
          },
        },
        { status: 400 }
      );
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUND!) || 10
    );

    // Prepare the user data to be created
    usersToCreate.push({
      first_name: validation.data.first_name,
      last_name: validation.data.last_name,
      username: username.toLowerCase(),
      password: hashedPassword,
      email,
      phone_number,
      role_id: 2, // Default role, change if necessary
    });
  }

  try {
    const newUsers = await prisma.users.createMany({
      data: usersToCreate,
      skipDuplicates: true, // Avoids creating duplicate entries in one request
    });

    return NextResponse.json(
      {
        status: "success",
        message: `${newUsers.count} کاربر با موفقیت ایجاد شدند.`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "خطا در هنگام ایجاد کاربران." },
      { status: 500 }
    );
  }
}
