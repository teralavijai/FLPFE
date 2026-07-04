import { useState } from "react";

import {
    Box,
    Toolbar,
} from "@mui/material";

import { Outlet } from "react-router-dom";

import AppHeader from "./AppHeader";
import SideNavigation from "./SideNavigation";

const DRAWER_WIDTH = 260;
const MINI_DRAWER_WIDTH = 72;

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: "#f5f7fb",
            }}
        >
            <AppHeader
                onToggle={() => setCollapsed((v) => !v)}
            />

            <SideNavigation collapsed={collapsed} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: collapsed
                        ? `${MINI_DRAWER_WIDTH}px`
                        : `${DRAWER_WIDTH}px`,
                    transition: "margin .2s",
                    p: 3,
                }}
            >
                <Toolbar />

                <Outlet />
            </Box>
        </Box>
    );
}
