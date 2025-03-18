import { object, string, z } from "zod";

export const registerFormSchema = object({
    name: string().min(1, { message: "Please enter a name" }),
    email: string().email({ message: "Please enter a valid email" }),
    password: string().min(8, {
        message: "Please enter a password of at least 8 characters",
    }),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
