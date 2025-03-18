import { number, object, string, z } from "zod";

export const productSchema = object({
    _id: string(),
    name: string(),
    price: number(),
    stock: number(),
    description: string(),
    brand: string(),
    sku: string(),
    tags: string().array(),
    createdAt: string(),
    updatedAt: string(),
});

export type Product = z.infer<typeof productSchema>;
