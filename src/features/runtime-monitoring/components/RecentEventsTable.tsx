import { useMemo } from "react";

import {
    Box,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import ListAltIcon from "@mui/icons-material/ListAlt";

import { useTrainingJobs } from "../../training-jobs/hooks/useTrainingJobs";
import { useRuntime } from "../../../hooks/useRuntime";

export default function RecentEventsTable() {

    const {

        data: jobs = [],

    } = useTrainingJobs();

    const {

        getTrainingEvents,

    } = useRuntime();

    //------------------------------------------------------------------
    // Collect events
    //------------------------------------------------------------------

    const events = useMemo(() => {

        const allEvents = jobs.flatMap(job =>
            getTrainingEvents(job.id),
        );

        return allEvents

            .sort((a, b) => {

                const ta =
                    a.created_at
                        ? new Date(a.created_at).getTime()
                        : 0;

                const tb =
                    b.created_at
                        ? new Date(b.created_at).getTime()
                        : 0;

                return tb - ta;

            })

            .slice(0, 200);

    }, [

        jobs,

        getTrainingEvents,

    ]);

    //------------------------------------------------------------------

    return (

        <Paper sx={{ p: 2 }}>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >

                <Box
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                >

                    <ListAltIcon
                        color="primary"
                        fontSize="small"
                    />

                    <Typography
                        sx={{
                            fontSize: 30,
                            fontWeight: 700,
                        }}
                    >
                        Recent Events
                    </Typography>

                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >

                    {events.length} events

                </Typography>

            </Box>

            <TableContainer

                sx={{
                    maxHeight: 360,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                }}

            >

                <Table
                    size="small"
                    stickyHeader
                >

                    <TableHead>

                        <TableRow>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 13,
                                    letterSpacing: 0.6,
                                    textTransform: "uppercase",
                                }}
                            >
                                Time
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 13,
                                    letterSpacing: 0.6,
                                    textTransform: "uppercase",
                                }}
                            >
                                Job
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 13,
                                    letterSpacing: 0.6,
                                    textTransform: "uppercase",
                                }}
                            >
                                Round
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 13,
                                    letterSpacing: 0.6,
                                    textTransform: "uppercase",
                                }}
                            >
                                Event
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 13,
                                    letterSpacing: 0.6,
                                    textTransform: "uppercase",
                                }}
                            >
                                Level
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 13,
                                    letterSpacing: 0.6,
                                    textTransform: "uppercase",
                                }}
                            >
                                Message
                            </TableCell>

                        </TableRow>

                    </TableHead>
                                        <TableBody>

                        {events.length === 0 && (

                            <TableRow>

                                <TableCell
                                    colSpan={6}
                                    align="center"
                                    sx={{
                                        py: 5,
                                        color: "text.secondary",
                                    }}
                                >

                                    No runtime events available.

                                </TableCell>

                            </TableRow>

                        )}

                        {events.map((event, index) => (

                            <TableRow

                                key={`${event.job_id}-${index}`}

                                hover

                                sx={{
                                    "&:last-child td": {
                                        borderBottom: 0,
                                    },
                                }}

                            >

                                <TableCell>

                                    {event.created_at

                                        ? new Date(
                                              event.created_at,
                                          ).toLocaleTimeString()

                                        : "-"}

                                </TableCell>

                                <TableCell>

                                    {event.job_id}

                                </TableCell>

                                <TableCell>

                                    {event.round_number ?? "-"}

                                </TableCell>

                                <TableCell>

                                    <Chip

                                        label={event.event_type}

                                        size="small"

                                        color={

                                            event.event_type.includes("FAILED")

                                                ? "error"

                                                : event.event_type.includes("COMPLETED")

                                                ? "success"

                                                : event.event_type.includes("START")

                                                ? "primary"

                                                : "default"

                                        }

                                        variant={

                                            event.event_type.includes("COMPLETED")

                                                ? "outlined"

                                                : "filled"

                                        }

                                    />

                                </TableCell>

                                <TableCell>

                                    <Chip

                                        label={event.event_level}

                                        size="small"

                                        color={

                                            event.event_level === "ERROR"

                                                ? "error"

                                                : event.event_level === "WARNING"

                                                ? "warning"

                                                : "default"

                                        }

                                        variant="outlined"

                                    />

                                </TableCell>

                                <TableCell
                                    sx={{
                                        maxWidth: 500,
                                    }}
                                >

                                    <Typography
                                        variant="body2"
                                    >

                                        {event.message}

                                    </Typography>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>

            <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >

                <Typography
                    variant="caption"
                    color="text.secondary"
                >

                    Showing latest {events.length} runtime events

                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >

                    Events are updated automatically through the Runtime WebSocket.

                </Typography>

            </Box>

        </Paper>

    );

}