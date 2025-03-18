import { X } from "lucide-react";

import {
    capitalizeFirstLetter,
    formatPrice,
} from "../../../lib/helpers/formatters";
import { SpecialPrice } from "../../../lib/schemas/entities/specialPrice";
import { useDeleteSpecialPrice } from "../../../lib/hooks/queries/useQuerySpecialPrices";

import { Button } from "../../atoms/Buttons/Button";

interface Props {
    specialPrice: SpecialPrice;
}

export function SpecialPriceCard({ specialPrice }: Props) {
    const { deleteSpecialPrice, isDeleting } = useDeleteSpecialPrice();

    const handleDeleteSpecialPrice = async () => {
        if (
            window.confirm(
                "Are you sure you want to delete this special price?",
            )
        )
            await deleteSpecialPrice(specialPrice._id);
    };

    return (
        <article className="relative rounded-lg border p-4 shadow-md">
            <Button
                variant="link"
                className="absolute -top-1 -right-1"
                onClick={handleDeleteSpecialPrice}
                disabled={isDeleting}
            >
                <X />
            </Button>

            <h2 className="font-bold">{formatPrice(specialPrice.price)}</h2>

            <p>
                <span className="font-semibold">Product: </span>
                {capitalizeFirstLetter(specialPrice.product.name)}
            </p>

            <p>
                <span className="font-semibold">User: </span>
                {capitalizeFirstLetter(specialPrice.user.name)}
            </p>
        </article>
    );
}
