import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteData, getData, postData } from "../../helpers/requests";
import { validateZodSchema } from "../../helpers/zodValidator";
import { specialPriceSchema } from "../../schemas/entities/specialPrice";
import { SPECIAL_PRICES_ENDPOINTS } from "../../utils/routes";
import { SpecialPriceFormData } from "../../schemas/forms/specialPrice";
import { queryClient } from "../../../App";

const getAllSpecialPrices = async () => {
    const endpoint = SPECIAL_PRICES_ENDPOINTS.get_all();
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await getData({ endpoint, token });

    const validation = validateZodSchema(
        specialPriceSchema.array(),
        response.specialPrices,
    );

    if (!validation.success) {
        console.error(validation.error.message);

        throw new Error("Data validation failed in 'getAllSpecialPrices'");
    }

    return validation.data;
};

export const useGetAllSpecialPrices = () => {
    const { data, ...rest } = useQuery({
        queryKey: ["specialPrices"],
        queryFn: getAllSpecialPrices,
    });

    return { specialPrices: data || [], ...rest };
};

const createSpecialPrice = async (data: SpecialPriceFormData) => {
    const endpoint = SPECIAL_PRICES_ENDPOINTS.create();
    const token = localStorage.getItem("token");

    if (!token) return;

    return await postData({ endpoint, data, token });
};

export const useCreateSpecialPrice = () => {
    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: (data: SpecialPriceFormData) => createSpecialPrice(data),
        onMutate: () => toast.loading("Creating...", { id: "loading" }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["specialPrices"] });
            queryClient.invalidateQueries({ queryKey: ["products"] });

            toast.success("Created successfully");
        },
        onError: () => toast.error("Creation failed. Please try again."),
        onSettled: () => toast.dismiss("loading"),
    });

    return { createSpecialPrice: mutateAsync, isCreating: isPending, ...rest };
};

const deleteSpecialPrice = async (id: string) => {
    const endpoint = SPECIAL_PRICES_ENDPOINTS.delete(id);
    const token = localStorage.getItem("token");

    if (!token) return;

    return await deleteData({ endpoint, token });
};

export const useDeleteSpecialPrice = () => {
    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: (id: string) => deleteSpecialPrice(id),
        onMutate: () => toast.loading("Deleting...", { id: "loading" }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["specialPrices"] });
            queryClient.invalidateQueries({ queryKey: ["products"] });

            toast.success("Deleted successfully");
        },
        onError: () => toast.error("Deletion failed. Please try again."),
        onSettled: () => toast.dismiss("loading"),
    });

    return { deleteSpecialPrice: mutateAsync, isDeleting: isPending, ...rest };
};
