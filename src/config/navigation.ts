import DashboardIcon from "@mui/icons-material/Dashboard";
import HubIcon from "@mui/icons-material/Hub";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import StorageIcon from "@mui/icons-material/Storage";
import DnsIcon from "@mui/icons-material/Dns";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import MemoryIcon from "@mui/icons-material/Memory";

import type { ElementType } from "react";

export interface NavigationItem {
    title: string;
    path: string;
    icon: ElementType;
}

const navigation: NavigationItem[] = [
    {
        title: "Dashboard",
        path: "/",
        icon: DashboardIcon,
    },
    {
        title: "Federated Learning",
        path: "/federated-learning",
        icon: HubIcon,
    },
    {
        title: "Training Jobs",
        path: "/training-jobs",
        icon: ModelTrainingIcon,
    },
    {
        title: "ML Models",
        path: "/ml-models",
        icon: PsychologyIcon,
    },
    {
        title: "Runtime Monitoring",
        path: "/runtime",
        icon: MonitorHeartIcon,
    },
    {
        title: "Datasets",
        path: "/datasets",
        icon: StorageIcon,
    },
    {
        title: "Agents",
        path: "/agents",
        icon: DnsIcon,
    },
    {
        title: "Users",
        path: "/users",
        icon: PeopleIcon,
    },
    {
        title: "Settings",
        path: "/settings",
        icon: SettingsIcon,
    },
];

export default navigation;
