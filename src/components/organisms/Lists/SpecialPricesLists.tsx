import { SpecialPrice } from "../../../lib/schemas/entities/specialPrice";
import { SpecialPriceCard } from "../../molecules/Cards/SpecialPriceCard";

interface Props {
    specialPrices: SpecialPrice[];
}

export function SpecialPricesLists({ specialPrices }: Props) {
    return (
        <section className="grid flex-wrap gap-4 sm:grid-cols-2 md:flex">
            {specialPrices.map((specialPrice) => (
                <SpecialPriceCard
                    key={specialPrice._id}
                    specialPrice={specialPrice}
                />
            ))}
        </section>
    );
}
