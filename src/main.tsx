import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";

import App from "./app/App";
import AppProviders from "./app/providers";
import { queryClient } from "./lib/react-query";

import "./assets/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppProviders>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AppProviders>
        </QueryClientProvider>
    </React.StrictMode>
);