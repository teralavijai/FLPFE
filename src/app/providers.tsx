import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

import theme from "../theme";

interface Props {
    children: ReactNode;
}

export default function AppProviders({ children }: Props) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
