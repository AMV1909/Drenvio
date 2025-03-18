import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    keepPreviousData,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AxiosError } from "axios";

import { Home, Login, Register, SpecialPrices, NotFound } from "./pages";
import { Navbar } from "./components/molecules/Navbar/Navbar";
import { ProtectedRoute } from "./lib/Auth/ProtectedRoute";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: (_, error) => {
                if (error instanceof AxiosError)
                    return error.response?.status !== 404;

                return true;
            },
            staleTime: 60000, // 1 minute
            placeholderData: keepPreviousData,
        },
    },
});

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Navbar />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <ProtectedRoute>
                                <Login />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <ProtectedRoute>
                                <Register />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/special-prices"
                        element={
                            <ProtectedRoute>
                                <SpecialPrices />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Toaster position="top-center" richColors closeButton />
            </Router>
        </QueryClientProvider>
    );
}
