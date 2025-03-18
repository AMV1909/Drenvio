import { useState } from "react";

import { useGetAllSpecialPrices } from "../lib/hooks/queries/useQuerySpecialPrices";

import { Loader } from "../components/atoms/Loader/Loader";
import { Button } from "../components/atoms/Buttons/Button";
import { SpecialPricesLists } from "../components/organisms/Lists/SpecialPricesLists";
import { CreateSpecialPriceModal } from "../components/organisms/Modals/CreateSpecialPriceModal";

export function SpecialPrices() {
    const [open, setOpen] = useState(false);

    const { specialPrices, isLoading } = useGetAllSpecialPrices();

    return (
        <main className="my-10 px-6 sm:px-10 xl:px-20">
            {isLoading && <Loader className="mt-20" />}

            {!isLoading && (
                <div className="flex items-center justify-center">
                    <Button onClick={() => setOpen(true)} className="mb-4">
                        Create special price
                    </Button>
                </div>
            )}

            {!isLoading && specialPrices.length === 0 && (
                <div className="flex h-full w-full items-center justify-center text-center text-3xl font-bold text-gray-500">
                    No special prices found
                </div>
            )}

            {!isLoading && specialPrices.length > 0 && (
                <SpecialPricesLists specialPrices={specialPrices} />
            )}

            {open && <CreateSpecialPriceModal close={() => setOpen(false)} />}
        </main>
    );
}
