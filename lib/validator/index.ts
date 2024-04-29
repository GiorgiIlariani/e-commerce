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


export const deactivateFormSchema = z.object({
  username: z.string().min(2, {
    message: "username must be at least 2 charachters",
  }),
});

export const filtersFormSchema = z.object({
  location: z.string().optional(),
  max_price: z.string().optional(),
  min_price: z.string().optional(),
});

export const productFormSchema = z.object({
  description: z.string().optional(),
  name: z.string().min(1, { message: 'Please enter a name with at least 1 character.' }).optional(),
  price: z.string().min(0.01, { message: 'Please enter a price.' }).optional(),
  location: z.string().min(1, { message: 'Please select a location.' }).optional(),
  images: z.array(z.string()).min(1).max(12, { message: 'Please upload at least 1 and at most 12 images.' }),
  category: z.string().min(1, { message: 'Please select a category.' }).optional(),
});



