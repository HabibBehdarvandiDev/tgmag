import { z } from "zod";

const UserRegisterSchema = z.object({
  first_name: z
    .string({ required_error: "نام الزامی است." })
    .min(2, { message: "نام باید حداقل ۲ حرف باشد." })
    .max(50, { message: "نام نمی‌تواند بیشتر از 50 حرف باشد." }),

  last_name: z
    .string({ required_error: "نام خانوادگی الزامی است." })
    .min(2, { message: "نام خانوادگی باید حداقل ۲ حرف باشد." })
    .max(50, { message: "نام خانوادگی نمی‌تواند بیشتر از 50 حرف باشد." }),

  username: z
    .string({ required_error: "نام کاربری الزامی است." })
    .min(3, { message: "نام کاربری باید حداقل ۳ حرف باشد." })
    .max(24, { message: "نام کاربری نمی‌تواند بیشتر از 24 حرف باشد." }),

  password: z
    .string({ required_error: " رمز ورود الزامی است." })
    .min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" }),
});

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

export { UserRegisterSchema, UserLoginSchema };
