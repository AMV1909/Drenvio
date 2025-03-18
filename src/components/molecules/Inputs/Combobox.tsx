// TP
import { useEffect, useState, type ReactNode } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

// BL
import { cn } from "../../../lib/utils/cn";

// UI
import { Button } from "../../atoms/Buttons/Button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../atoms/Popover/Popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../atoms/Command/Command";

interface Props {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
    required?: boolean;
    options: {
        icon?: ReactNode;
        label: string;
        value: string | number;
    }[];
    placeholder?: string;
    errorMessage?: string;
    rowHeight?: number;
}

export function Combobox({
    label,
    value,
    onChange,
    required,
    options,
    placeholder = "Select an option",
    errorMessage,
}: Props) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase()),
    );
    const optionSelect = options.find((option) => option.value === value);

    useEffect(() => {
        if (!open) setSearch("");
    }, [open]);

    return (
        <div>
            <label className="flex flex-col gap-1">
                <span className="text-sm font-semibold">
                    {label} {required && "*"}
                </span>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                                "h-9 justify-between border-gray-300 text-black",
                                errorMessage && "border-red-500",
                            )}
                        >
                            <div className="flex items-center gap-2">
                                {optionSelect?.icon}
                                {value ? optionSelect?.label : placeholder}
                            </div>

                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                        <Command>
                            <CommandInput
                                placeholder="Search here..."
                                className="h-9"
                                onValueChange={setSearch}
                            />

                            <CommandList>
                                <CommandEmpty>No options found.</CommandEmpty>

                                <CommandGroup>
                                    {filteredOptions.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value.toString()}
                                            onSelect={() => {
                                                onChange(option.value);
                                                setOpen(false);
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                {option.icon}
                                                {option.label}
                                            </div>

                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    value === option.value
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </label>

            {errorMessage && (
                <span className="mt-1 text-sm text-red-500">
                    {errorMessage}
                </span>
            )}
        </div>
    );
}
