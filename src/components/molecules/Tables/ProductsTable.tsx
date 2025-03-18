import {
    capitalizeFirstLetter,
    formatPrice,
} from "../../../lib/helpers/formatters";
import { Product } from "../../../lib/schemas/entities/product";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../atoms/Table/Table";

interface Props {
    products: Product[];
}

export function ProductsTable({ products }: Props) {
    return (
        <Table className="hidden md:table">
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Tags</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {products.map((product) => {
                    return (
                        <TableRow key={product._id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{formatPrice(product.price)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell>{product.sku}</TableCell>
                            <TableCell>
                                {product.tags
                                    .map(capitalizeFirstLetter)
                                    .join(" - ")}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
