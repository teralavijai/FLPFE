import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import MemoryIcon from "@mui/icons-material/Memory";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useRuntime } from "../../../hooks/useRuntime";

interface Props {

    activeJobs: number;

}

interface SummaryCardProps {

    title: string;

    value: string | number;

    subtitle: string;

    subtitleColor?: string;

    icon: React.ReactNode;

}

function SummaryCard({

    title,

    value,

    subtitle,

    subtitleColor = "text.secondary",

    icon,

}: SummaryCardProps) {

    return (

        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                transition: "0.2s",

                "&:hover": {
                    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                },
            }}
        >

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >

                <Stack spacing={0.4}>

                    <Typography
                        sx={{
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: 0.8,
                            textTransform: "uppercase",
                            color: "text.secondary",
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 22,
                            fontWeight: 700,
                            lineHeight: 1.2,
                        }}
                    >
                        {value}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: subtitleColor,
                        }}
                    >
                        {subtitle}
                    </Typography>

                </Stack>

                {icon}

            </Stack>

        </Paper>

    );

}

export default function RuntimeSummaryCards({

    activeJobs,

}: Props) {

    const {

        connected,

        connectedClients,

    } = useRuntime();

    return (

        <Grid
            container
            spacing={2}
        >

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard
                    title="Active Jobs"
                    value={activeJobs}
                    subtitle={
                        activeJobs > 0
                            ? "Running"
                            : "Idle"
                    }
                    subtitleColor={
                        activeJobs > 0
                            ? "success.main"
                            : "text.secondary"
                    }
                    icon={
                        <MemoryIcon
                            fontSize="large"
                            color="primary"
                        />
                    }
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard
                    title="Connected Clients"
                    value={connectedClients.length}
                    subtitle="Online"
                    subtitleColor="success.main"
                    icon={
                        <GroupsIcon
                            fontSize="large"
                            color="success"
                        />
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard
                title="WebSocket"
                value={
                    connected
                        ? "Connected"
                        : "Disconnected"
                }
                subtitle={
                    connected
                        ? "Live"
                        : "Offline"
                }
                subtitleColor={
                    connected
                        ? "success.main"
                        : "error.main"
                }
                icon={
                    <TrendingUpIcon
                        fontSize="large"
                        color={
                            connected
                                ? "success"
                                : "error"
                        }
                    />
                }
            />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard
                    title="Platform"
                    value="Healthy"
                    subtitle="Operational"
                    subtitleColor="success.main"
                    icon={
                        <CheckCircleIcon
                            fontSize="large"
                            color="success"
                        />
                    }
                />

            </Grid>

        </Grid>

    );

}