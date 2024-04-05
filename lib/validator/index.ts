import { z } from "zod";


export const SignInFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email format.",
  }).optional(),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters long.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long.",
  }),
  first_name: z.string().min(2, {
    message: "Username must be at least 2 characters long.",
  }).optional(),
  last_name: z.string().min(2, {
    message: "Username must be at least 2 characters long.",
  }).optional(),
});

