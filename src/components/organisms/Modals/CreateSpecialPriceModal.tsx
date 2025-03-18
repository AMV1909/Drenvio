import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetAllUsers } from "../../../lib/hooks/queries/useQueryUsers";
import { useGetAllProducts } from "../../../lib/hooks/queries/useQueryProducts";
import {
    SpecialPriceFormData,
    specialPriceFormSchema,
} from "../../../lib/schemas/forms/specialPrice";
import { useCreateSpecialPrice } from "../../../lib/hooks/queries/useQuerySpecialPrices";

import { Modal } from "../../molecules/Modal/Modal";
import { Combobox } from "../../molecules/Inputs/Combobox";
import { InputWithLabel } from "../../molecules/Inputs/InputWithLabel";
import { Button } from "../../atoms/Buttons/Button";

interface Props {
    close: () => void;
}

export function CreateSpecialPriceModal({ close }: Props) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SpecialPriceFormData>({
        resolver: zodResolver(specialPriceFormSchema),
    });

    const { users } = useGetAllUsers();
    const { products } = useGetAllProducts();
    const { createSpecialPrice, isCreating } = useCreateSpecialPrice();

    const onSubmit = async (data: SpecialPriceFormData) => {
        await createSpecialPrice(data);

        close();
    };

    return (
        <Modal title="Create special price" close={close}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-2"
            >
                <Controller
                    control={control}
                    name="productId"
                    render={({ field }) => (
                        <Combobox
                            label="Product"
                            placeholder="Select a product"
                            options={products.map((product) => ({
                                label: product.name,
                                value: product._id,
                            }))}
                            {...field}
                            errorMessage={errors.productId?.message}
                            required
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="userId"
                    render={({ field }) => (
                        <Combobox
                            label="User"
                            placeholder="Select a user"
                            options={users.map((user) => ({
                                label: user.name,
                                value: user._id,
                            }))}
                            {...field}
                            errorMessage={errors.userId?.message}
                            required
                        />
                    )}
                />

                <InputWithLabel
                    type="number"
                    label="Price"
                    {...register("price", { valueAsNumber: true })}
                    errorMessage={errors.price?.message}
                    required
                />

                <Button disabled={isCreating}>Create</Button>
            </form>
        </Modal>
    );
}
