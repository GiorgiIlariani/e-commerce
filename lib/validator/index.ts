import { z } from "zod";

// authentication schema
export const SignInFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email format.",
    })
    .optional(),
  password: z
    .string()
    .min(4, {
      message: "Password must be at least 4 characters long.",
    })
    .max(150, "Password must be fewer that 150 charachters long."),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long.",
    })
    .max(150, "username must be fewer that 150 charachters long."),
  first_name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long.",
    })
    .max(150, "firstName must be fewer that 150 charachters long.")
    .optional(),
  last_name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long.",
    })
    .max(150, "lastName must be fewer that 150 charachters long.")
    .optional(),
});

// user schemas
export const changeUserInformationSchema = z.object({
  image: z.string().optional(),
  username: z
    .string()
    .min(2, "username must be at least 2 charachters")
    .max(150, "username must be fewer than 150 charachters"),
  email: z.string().email(),
  agreement: z.literal<boolean>(true, {
    errorMap: () => ({ message: "You must accept the data processing" }),
  }),
});

export const deactivateFormSchema = z.object({
  username: z.string().min(2, {
    message: "username must be at least 2 charachters",
  }),
  agreement: z.literal<boolean>(true, {
    errorMap: () => ({ message: "You must accept the account deactvating" }),
  }),
});

export const changePasswordSchema = z.object({
  newPassword: z.string().min(4, {
    message: "at least 4 characters long!",
  }),
  repeatNewPassword: z.string().min(4, {
    message: "at least 4 characters long!",
  }),
});

export const filtersFormSchema = z.object({
  location: z.string().optional(),
  max_price: z.string().optional(),
  min_price: z.string().optional(),
});

export const productFormSchema = z.object({
  description: z.string().optional(),
  name: z
    .string()
    .min(1, { message: "Please enter a name with at least 1 character." })
    .optional(),
  price: z.string().min(1, { message: "Please enter a price." }).optional(),
  quantity: z.string().min(1, { message: "Please enter a quantity." }).optional(),
  location: z
    .string()
    .min(1, { message: "Please select a location." })
    .optional(),
  images: z
    .array(
      z.union([z.object({ id: z.number(), image: z.string() }), z.string()])
    )
    .min(1)
    .max(12, { message: "Please upload at least 1 and at most 12 images." }),
  category: z
    .string()
    .min(1, { message: "Please select a category." })
    .optional(),
});

export const contactFormSchema = z.object({
  from_name: z.string().min(2, "Name must be at least 2 characters"),
  from_email: z.string().email("Invalid email format"),
  phone_number: z.string().min(9, "Please enter a phone number"),
  message: z.string().min(2, "Message must be at least 2 characters"),
});
