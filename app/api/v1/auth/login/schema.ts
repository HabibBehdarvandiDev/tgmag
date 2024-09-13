import { z } from "zod";

const UserLoginSchema = z.object({
  username: z
    .string({ required_error: "نام کاربری الزامی است." })
    .min(3, { message: "نام کاربری باید حداقل ۳ حرف باشد." })
    .max(24, { message: "نام کاربری نمی‌تواند بیشتر از 24 حرف باشد." }),

  password: z
    .string({ required_error: "رمز عبور الزامی است." })
    .min(8, { message: "رمز عبور باید حداقل ۸ حرف باشد." })
    .max(100, { message: "رمز عبور نمی‌تواند بیشتر از 100 حرف باشد." }),
});

export default UserLoginSchema;
