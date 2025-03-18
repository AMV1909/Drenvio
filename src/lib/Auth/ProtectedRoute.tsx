import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppStore } from "../store";

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const location = useLocation().pathname;
    const { user } = useAppStore();

    switch (location) {
        case "/":
            if (!user) return <Navigate to="/login" />;
            break;

        case "/login":
            if (user) return <Navigate to="/" />;
            break;

        case "/register":
            if (user) return <Navigate to="/" />;
            break;

        case "/special-prices":
            if (!user) return <Navigate to="/login" />;
            break;

        default:
            break;
    }

    return children;
}
