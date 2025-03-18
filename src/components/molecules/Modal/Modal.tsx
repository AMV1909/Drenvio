"use client";

// TP
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { ReactNode } from "react";

// BL
import { cn } from "../../../lib/utils/cn";

// UI
import { Button } from "../../atoms/Buttons/Button";

interface Props {
    title?: string;
    close?: () => void;
    children?: ReactNode;
    className?: string;
}

export function Modal({ title, close, children, className }: Props) {
    return createPortal(
        <div
            role="dialog"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
        >
            <section
                className={cn(
                    "mx-4 flex w-[500px] max-w-full flex-col gap-4 rounded-lg bg-white p-2 sm:p-6",
                    className,
                )}
            >
                {title && close && (
                    <header className="flex items-center justify-between">
                        <h2 className="text-lg">{title}</h2>

                        <Button
                            variant="ghost"
                            onClick={close}
                            className="rounded-full"
                        >
                            <X />
                        </Button>
                    </header>
                )}

                <div className="flex-1 overflow-y-auto">{children}</div>
            </section>
        </div>,
        document.body,
    );
}
