import { number, object, string, z } from "zod";

import { productSchema } from "./product";
import { userSchema } from "./user";

export const specialPriceSchema = object({
    _id: string(),
    product: productSchema,
    user: userSchema,
    price: number(),
});

export type SpecialPrice = z.infer<typeof specialPriceSchema>;
