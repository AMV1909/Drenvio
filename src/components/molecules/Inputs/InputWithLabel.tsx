// TP
import { useId, type ComponentProps } from "react";

// BL
import { cn } from "../../../lib/utils/cn";

// UI
import { Input } from "../../atoms/Inputs/Input";

interface Props extends ComponentProps<typeof Input> {
    label: string;
}

export function InputWithLabel({
    label,
    className,
    required,
    ...props
}: Props) {
    const id = useId();

    return (
        <div className={cn("flex flex-col gap-1", className)}>
            <label htmlFor={id} className={cn("text-sm font-semibold")}>
                {label} {required && "*"}
            </label>

            <Input id={id} {...props} />
        </div>
    );
}
