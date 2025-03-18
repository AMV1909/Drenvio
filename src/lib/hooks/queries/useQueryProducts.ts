import { useQuery } from "@tanstack/react-query";

import { getData } from "../../helpers/requests";
import { validateZodSchema } from "../../helpers/zodValidator";
import { productSchema } from "../../schemas/entities/product";
import { PRODUCTS_ENDPOINTS } from "../../utils/routes";

const getAllProducts = async () => {
    const endpoint = PRODUCTS_ENDPOINTS.get_all();
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await getData({ endpoint, token });

    const validation = validateZodSchema(
        productSchema.array(),
        response.products,
    );

    if (!validation.success) {
        console.error(validation.error.message);

        throw new Error("Data validation failed in 'getAllProducts'");
    }

    return validation.data;
};

export const useGetAllProducts = () => {
    const { data, ...rest } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    return { products: data || [], ...rest };
};
