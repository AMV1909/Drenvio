import { ComponentProps } from "react";
import { Loader as Spinner } from "lucide-react";

import { cn } from "../../../lib/utils/cn";

export function Loader({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "flex h-full w-full items-center justify-center",
                className,
            )}
            {...props}
        >
            <Spinner className="h-12 w-12 animate-spin" />
        </div>
    );
}
