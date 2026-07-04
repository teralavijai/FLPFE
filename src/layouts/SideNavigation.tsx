import {
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";

import { NavLink, useLocation } from "react-router-dom";

import navigation from "../config/navigation";

interface Props {
    collapsed: boolean;
}

const DRAWER_WIDTH = 260;
const MINI_DRAWER_WIDTH = 72;

export default function SideNavigation({
    collapsed,
}: Props) {
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: collapsed
                    ? MINI_DRAWER_WIDTH
                    : DRAWER_WIDTH,

                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: collapsed
                        ? MINI_DRAWER_WIDTH
                        : DRAWER_WIDTH,

                    transition: "width .25s",

                    overflowX: "hidden",

                    whiteSpace: "nowrap",

                    boxSizing: "border-box",

                    borderRight: "1px solid",

                    borderColor: "divider",
                },
            }}
        >
            <Toolbar />

            <Box
                sx={{
                    px: collapsed ? 1 : 3,
                    py: 2,
                }}
            >
                {collapsed ? (
                    <Typography
                        variant="h5"
                        align="center"
                        fontWeight={700}
                    >
                        FL
                    </Typography>
                ) : (
                    <>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            FedLearn
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Enterprise AI Platform
                        </Typography>
                    </>
                )}
            </Box>

            <Divider />

            <List
                sx={{
                    pt: 1,
                }}
            >
                {navigation.map((item) => {
                    const Icon = item.icon;

                    const active =
                        location.pathname === item.path;

                    return (
                        <Tooltip
                            key={item.path}
                            title={
                                collapsed
                                    ? item.title
                                    : ""
                            }
                            placement="right"
                        >
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                sx={{
                                    mx: 1,
                                    my: 0.5,

                                    minHeight: 46,

                                    borderRadius: 2,

                                    justifyContent:
                                        collapsed
                                            ? "center"
                                            : "flex-start",

                                    px: collapsed
                                        ? 2
                                        : 2.5,

                                    bgcolor: active
                                        ? "primary.main"
                                        : "transparent",

                                    color: active
                                        ? "primary.contrastText"
                                        : "text.primary",

                                    "&:hover": {
                                        bgcolor: active
                                            ? "primary.dark"
                                            : "action.hover",
                                    },

                                    "& .MuiListItemIcon-root": {
                                        minWidth: 0,

                                        mr: collapsed
                                            ? 0
                                            : 2,

                                        justifyContent:
                                            "center",

                                        color: "inherit",
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>

                                {!collapsed && (
                                    <ListItemText
                                        primary={item.title}
                                        primaryTypographyProps={{
                                            fontSize: 14,
                                            fontWeight: active
                                                ? 700
                                                : 500,
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </Tooltip>
                    );
                })}
            </List>
        </Drawer>
    );
}
