import { useGetAllProducts } from "../lib/hooks/queries/useQueryProducts";

import { Loader } from "../components/atoms/Loader/Loader";
import { ProductsTable } from "../components/molecules/Tables/ProductsTable";
import { ProductsList } from "../components/organisms/Lists/ProductsList";

export function Home() {
    const { products, isLoading } = useGetAllProducts();

    return (
        <main className="my-10 px-6 sm:px-10 xl:px-20">
            {isLoading && <Loader className="mt-20" />}

            {!isLoading && products.length === 0 && (
                <div className="flex h-full w-full items-center justify-center text-center text-3xl font-bold text-gray-500">
                    No products found
                </div>
            )}

            {!isLoading && products.length > 0 && (
                <>
                    <ProductsTable products={products} />
                    <ProductsList products={products} />
                </>
            )}
        </main>
    );
}
