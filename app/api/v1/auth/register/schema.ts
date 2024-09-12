import { z } from "zod";

const UserRegisterSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  password: z.string(),
});

export { UserRegisterSchema };
