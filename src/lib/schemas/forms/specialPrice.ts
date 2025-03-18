import { number, object, string, z } from "zod";

export const specialPriceFormSchema = object({
    price: number().min(0, { message: "Please enter a valid price" }),
    userId: string({ message: "Please select a user" }),
    productId: string({ message: "Please select a product" }),
});

export type SpecialPriceFormData = z.infer<typeof specialPriceFormSchema>;
