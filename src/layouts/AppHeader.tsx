import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";

import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";

interface Props {
    onToggle: () => void;
}

export default function AppHeader({ onToggle }: Props) {
    return (
        <AppBar
            position="fixed"
            elevation={1}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onToggle}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ flexGrow: 1 }}
                >
                    FedLearn Enterprise Platform
                </Typography>

                <Tooltip title="Theme">
                    <IconButton color="inherit">
                        <DarkModeOutlined />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Notifications">
                    <IconButton color="inherit">
                        <NotificationsNoneOutlined />
                    </IconButton>
                </Tooltip>

                <Box ml={2}>
                    <Avatar
                        sx={{
                            bgcolor: "secondary.main",
                            width: 36,
                            height: 36,
                        }}
                    >
                        A
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
