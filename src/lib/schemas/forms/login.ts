import { object, string, z } from "zod";

export const loginFormSchema = object({
    email: string().email({ message: "Please enter a valid email" }),
    password: string().min(1, { message: "Please enter a password" }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
