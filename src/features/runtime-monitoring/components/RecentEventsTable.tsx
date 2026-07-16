import { useMemo } from "react";

import {
    Box,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import ListAltIcon from '@mui/icons-material/ListAlt';

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
    // Collect events from all jobs
    //------------------------------------------------------------------

    const events = useMemo(() => {

        const allEvents = jobs.flatMap(job =>
            getTrainingEvents(job.id),
        );

        return allEvents

            .sort(

                (a, b) => {

                    const ta =
                        a.created_at
                            ? new Date(a.created_at).getTime()
                            : 0;

                    const tb =
                        b.created_at
                            ? new Date(b.created_at).getTime()
                            : 0;

                    return tb - ta;

                },

            )

            .slice(0, 100);

    }, [

        jobs,

        getTrainingEvents,

    ]);

    //------------------------------------------------------------------

    return (

        <Paper sx={{ p: 2 }}>
            <Box
                display="flex"
                alignItems="center"
                gap={1.5}
                mb={2}
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
            
            <Table size="small">

                <TableHead>

                    <TableRow>

                        <TableCell
                            sx={{
                                fontWeight: 700,
                                fontSize: 13,
                                letterSpacing: 0.6,
                                textTransform: "uppercase",
                                color: "text.secondary",
                                bgcolor: "grey.50",
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
                                color: "text.secondary",
                                bgcolor: "grey.50",
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
                                color: "text.secondary",
                                bgcolor: "grey.50",
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
                                color: "text.secondary",
                                bgcolor: "grey.50",
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
                                color: "text.secondary",
                                bgcolor: "grey.50",
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
                                color: "text.secondary",
                                bgcolor: "grey.50",
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
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 13,
                                    letterSpacing: 0.6,
                                    textTransform: "uppercase",
                                    color: "text.secondary",
                                    bgcolor: "grey.50",
                                }}
                            >

                                No events available.

                            </TableCell>

                        </TableRow>

                    )}

                    {events.map(

                        (event, index) => (

                            <TableRow
                                key={`${event.job_id}-${index}`}
                                hover
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

                                            event.event_type.includes(
                                                "FAILED",
                                            )

                                                ? "error"

                                                : event.event_type.includes(
                                                      "COMPLETED",
                                                  )

                                                ? "success"

                                                : "primary"

                                        }

                                    />

                                </TableCell>

                                <TableCell>

                                    <Chip

                                        label={event.event_level}

                                        size="small"

                                        color={

                                            event.event_level ===
                                            "ERROR"

                                                ? "error"

                                                : event.event_level ===
                                                  "WARNING"

                                                ? "warning"

                                                : "default"

                                        }

                                    />

                                </TableCell>

                                <TableCell>

                                    {event.message}

                                </TableCell>

                            </TableRow>

                        ),

                    )}

                </TableBody>

            </Table>

        </Paper>

    );

}