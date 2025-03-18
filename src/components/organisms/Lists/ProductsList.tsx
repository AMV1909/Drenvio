import { Product } from "../../../lib/schemas/entities/product";
import { ProductCard } from "../../molecules/Cards/ProductCard";

interface Props {
    products: Product[];
}

export function ProductsList({ products }: Props) {
    return (
        <section className="grid sm:grid-cols-2 gap-4 md:hidden">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </section>
    );
}
