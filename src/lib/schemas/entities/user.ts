import { object, string, z } from "zod";

export const userSchema = object({
    _id: string(),
    name: string(),
    email: string().email(),
    password: string(),
    createdAt: string(),
    updatedAt: string(),
});

export type User = z.infer<typeof userSchema>;
