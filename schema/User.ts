import { z } from "zod";

const UserUpdateSchema = z.object({
  first_name: z
    .string({ required_error: "نام الزامی است." })
    .min(2, { message: "نام باید حداقل ۲ حرف باشد." })
    .max(50, { message: "نام نمی‌تواند بیشتر از 50 حرف باشد." })
    .optional(),

  last_name: z
    .string({ required_error: "نام خانوادگی الزامی است." })
    .min(2, { message: "نام خانوادگی باید حداقل ۲ حرف باشد." })
    .max(50, { message: "نام خانوادگی نمی‌تواند بیشتر از 50 حرف باشد." })
    .optional(),

  username: z
    .string({ required_error: "نام کاربری الزامی است." })
    .min(3, { message: "نام کاربری باید حداقل ۳ حرف باشد." })
    .max(24, { message: "نام کاربری نمی‌تواند بیشتر از 24 حرف باشد." })
    .regex(/^[a-z]/, {
      message: "نام کاربری باید با حرف کوچک انگلیسی شروع شود.",
    })
    .regex(/^[a-z0-9_]+$/, {
      message:
        "نام کاربری فقط می‌تواند شامل حروف کوچک انگلیسی، اعداد و زیرخط (_) باشد.",
    })
    .regex(/[a-z0-9]$/, {
      message: "نام کاربری باید با اعداد و یا حروف کوچک انگلیسی پایان یابد.",
    })
    .optional(),

  password: z
    .string({ required_error: " رمز ورود الزامی است." })
    .min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" })
    .optional(),

  email: z.string().email({ message: "ایمیل نامعتبر است." }).optional(),

  phone_number: z
    .string()
    .regex(/^(\+98|0)?9\d{9}$/, {
      message: "لطفا شماره تماس معتبر وارد کنید.",
    })
    .optional(),
  is_active: z.boolean().optional(),
  is_verified: z.boolean().optional(),
  role_id: z.number().optional(),
});

export { UserUpdateSchema };
