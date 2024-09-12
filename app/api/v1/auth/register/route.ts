import { NextRequest, NextResponse } from "next/server";
import { UserRegisterSchema } from "./schema";

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

  !validation.success &&
    NextResponse.json(validation.error.formErrors.formErrors);

    

  return NextResponse.json(validation.data, { status: 200 });
}
