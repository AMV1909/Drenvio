import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

import { cn } from "../../../lib/utils/cn";
import { useAppStore } from "../../../lib/store";

import { Button } from "../../atoms/Buttons/Button";

const excludedRoutes = ["/login", "/register"];

export function Navbar() {
    const [activeRoute, setActiveRoute] = useState("/");

    const { pathname } = useLocation();
    const { setUser } = useAppStore();

    const routes = {
        "/": "Products",
        "/special-prices": "Special prices",
    };

    useEffect(() => {
        setActiveRoute(pathname);
    }, [pathname]);

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    if (excludedRoutes.includes(pathname)) return null;

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 shadow-md sm:px-6 md:px-20">
            <ul className="flex items-center">
                {Object.entries(routes).map(([route, label]) => (
                    <li key={route} className="px-2 py-4 sm:px-4">
                        <Link
                            to={route}
                            className={cn(
                                "text-lg font-semibold",
                                activeRoute === route
                                    ? "font-semibold underline"
                                    : "text-muted-foreground",
                            )}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>

            <Button onClick={logout}>
                <span className="hidden sm:block">Logout</span> <LogOut />
            </Button>
        </nav>
    );
}
