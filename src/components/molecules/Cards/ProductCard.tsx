import {
    capitalizeFirstLetter,
    formatPrice,
} from "../../../lib/helpers/formatters";
import { Product } from "../../../lib/schemas/entities/product";

interface Props {
    product: Product;
}

export function ProductCard({ product }: Props) {
    return (
        <article className="rounded-lg border p-4 shadow-md">
            <h2 className="font-bold">{product.name}</h2>

            <p>
                <span className="font-semibold">Price: </span>
                {formatPrice(product.price)}
            </p>

            <p>
                <span className="font-semibold">Stock: </span>
                {product.stock}
            </p>

            <p>
                <span className="font-semibold">Description: </span>
                {product.description}
            </p>

            <p>
                <span className="font-semibold">Brand: </span>
                {product.brand}
            </p>

            <p>
                <span className="font-semibold">SKU: </span>
                {product.sku}
            </p>

            <p>
                <span className="font-semibold">Tags: </span>
                {product.tags.map(capitalizeFirstLetter).join(" - ")}
            </p>
        </article>
    );
}
