import { object, string } from "zod";
import { userSchema } from "./user";

export const loginSchema = object({
    message: string(),
    user: userSchema,
    token: string(),
});
