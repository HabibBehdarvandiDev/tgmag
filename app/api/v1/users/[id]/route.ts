import prisma from "@/db/db";
import { UserUpdateSchema } from "@/schema/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Reusable function to validate if the id is numeric
function validateNumericId(id: string) {
  // Regex check to ensure the ID contains only digits
  if (!/^\d+$/.test(id)) {
    return NextResponse.json(
      {
        status: "error",
        message: "آیدی معتبر نمی‌باشد، لطفا آیدی عددی وارد نمائید.",
      },
      { status: 400 }
    );
  }
  return null; // Return null if validation passes
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Validate if the id is a number
  const validationError = validateNumericId(id);
  if (validationError) return validationError;

  // parse the id
  const userId = parseInt(id);

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          message: "کاربر مورد نظر وجود ندارد!",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "مشکلی هنگام اتصال به سرور بوجود آمد!",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Validate if the id is a number
  const validationError = validateNumericId(id);
  if (validationError) return validationError;

  // parse the id
  const userId = parseInt(id);

  // Parse and validate the body (updated user data)
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message:
          "بدن درخواست نمی‌تواند خالی باشد یا به شکل نادرستی ارسال شده است.",
      },
      { status: 400 }
    );
  }

  // Validate the updated data
  const validation = UserUpdateSchema.safeParse(body);
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

  if (validation.data.password) {
    validation.data.password = await bcrypt.hash(
      validation.data.password!,
      parseInt(process.env.SALT_ROUND!) || 10
    );
  }

  try {
    const updatedUser = await prisma.users.update({
      where: {
        id: userId,
      },
      data: validation.data,
    });

    return NextResponse.json({
      status: "success",
      message: "کاربر با موفقیت به‌روزرسانی شد.",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "خطایی در هنگام بروزرسانی کاربر رخ داد.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Validate if the id is a number
  const validationError = validateNumericId(id);
  if (validationError) return validationError;

  // parse the id
  const userId = parseInt(id);

  try {
    const deletedUser = await prisma.users.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({
      status: "success",
      message: `کاربر با آیدی ${userId} حذف شد.`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "مشکلی هنگام ارتباط به سرور بوجود آمد!",
      },
      { status: 500 }
    );
  }
}
