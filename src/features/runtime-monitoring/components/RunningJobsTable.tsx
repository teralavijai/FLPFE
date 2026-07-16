import { useMemo } from "react";

import {
    Paper,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Box,
} from "@mui/material";

import ListAltIcon from '@mui/icons-material/ListAlt';

import { useNavigate } from "react-router-dom";

import { useTrainingJobs } from "../../training-jobs/hooks/useTrainingJobs";

export default function RunningJobsTable() {

    const navigate = useNavigate();

    const {

        data: jobs = [],

        isLoading,

    } = useTrainingJobs();

    //------------------------------------------------------------------
    // Running Jobs
    //------------------------------------------------------------------

    const runningJobs = useMemo(

        () =>

            jobs.filter(

                job =>

                    job.status === "RUNNING" ||

                    job.status === "STARTING",

            ),

        [jobs],

    );

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
                    Running Jobs
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
                            Job ID
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
                            Name
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
                            Strategy
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
                            Status
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
                            Started
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {isLoading && (

                        <TableRow>

                            <TableCell
                                colSpan={5}
                            >

                                Loading...

                            </TableCell>

                        </TableRow>

                    )}

                    {!isLoading &&
                        runningJobs.length === 0 && (

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
                                
                                No running jobs.

                            </TableCell>

                        </TableRow>

                    )}

                    {runningJobs.map(

                        job => (

                            <TableRow

                                key={job.id}

                                hover

                                sx={{

                                    cursor: "pointer",

                                }}

                                onClick={() =>

                                    navigate(

                                        `/training-jobs/${job.id}`,

                                    )

                                }

                            >

                                <TableCell>

                                    {job.id}

                                </TableCell>

                                <TableCell>

                                    {job.name}

                                </TableCell>

                                <TableCell>

                                    {job.strategy}

                                </TableCell>

                                <TableCell>

                                    <Chip

                                        label={

                                            job.status

                                        }

                                        color={

                                            job.status ===
                                            "RUNNING"

                                                ? "success"

                                                : "warning"

                                        }

                                        size="small"

                                    />

                                </TableCell>

                                <TableCell>

                                    {job.started_at
                                        ? new Date(

                                              job.started_at,

                                          ).toLocaleString()
                                        : "-"}

                                </TableCell>

                            </TableRow>

                        ),

                    )}

                </TableBody>

            </Table>

            <Box
                mt={2}
            >

                <Typography
                    variant="caption"
                    color="text.secondary"
                >

                    Click a running job to
                    open its live monitoring
                    page.

                </Typography>

            </Box>

        </Paper>

    );

}