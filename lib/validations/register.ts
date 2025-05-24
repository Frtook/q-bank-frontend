import { z } from "zod";

export const schemaRegester = z
  .object({
    fullname: z.string().min(3, "the full name must have 3 characters"),
    username: z
      .string()
      .min(3, "the username must have 3 characters")
      .toLowerCase(),
    email: z.string().email(),
    password: z.string().min(8, "the password shuld be more than 8"),
    password2: z.string(),
    academyName: z.string().min(3, "the academy name must have 3 characters"),
  })
  .refine((data) => data.password === data.password2, {
    message: "password not match",
    path: ["password2"],
  });
export type TschemaRegester = z.infer<typeof schemaRegester>;
