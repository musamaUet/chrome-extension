"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/* SETUP QueryClient */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            throwOnError(error: any) {
                /* Handle error globally here */
                console.error("An error occurred:", error);
                return false;
            },
        },
    },
});

export default function AppKitProvider({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}