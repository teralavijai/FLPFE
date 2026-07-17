import { useMemo, useState } from "react";

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
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    TableContainer,
    type SelectChangeEvent,
} from "@mui/material";

import ListAltIcon from "@mui/icons-material/ListAlt";

import { useNavigate } from "react-router-dom";

import { useTrainingJobs } from "../../training-jobs/hooks/useTrainingJobs";

import type { TrainingJobStatus } from "../../training-jobs/types/trainingJob";

export default function RunningJobsTable() {

    const navigate = useNavigate();

    const {
        data: jobs = [],
        isLoading,
    } = useTrainingJobs();

    //------------------------------------------------------------------
    // Status Filter
    //------------------------------------------------------------------

    const [statusFilter, setStatusFilter] =
        useState<"ALL" | TrainingJobStatus>("ALL");

    const handleFilterChange = (
        event: SelectChangeEvent,
    ) => {

        setStatusFilter(
            event.target.value as
                | "ALL"
                | TrainingJobStatus,
        );

    };

    //------------------------------------------------------------------
    // Jobs
    //------------------------------------------------------------------

    const filteredJobs = useMemo(() => {

        let data = [...jobs];

        data.sort((a, b) => {

            const aTime = a.started_at
                ? new Date(a.started_at).getTime()
                : 0;

            const bTime = b.started_at
                ? new Date(b.started_at).getTime()
                : 0;

            return bTime - aTime;

        });

        if (statusFilter !== "ALL") {

            data = data.filter(

                job => job.status === statusFilter,

            );

        }

        return data;

    }, [jobs, statusFilter]);

    //------------------------------------------------------------------

    const statusColor = (
        status: TrainingJobStatus,
    ):
        | "success"
        | "warning"
        | "error"
        | "primary"
        | "default" => {

        switch (status) {

            case "RUNNING":
                return "success";

            case "STARTING":
                return "primary";

            case "COMPLETED":
                return "success";

            case "FAILED":
                return "error";

            case "CANCELLED":
                return "default";

            case "STOPPED":
                return "warning";

            case "CREATED":
            default:
                return "default";

        }

    };

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
                        Training Jobs
                    </Typography>

                </Box>

                <FormControl
                    size="small"
                    sx={{ minWidth: 150 }}
                >

                    <InputLabel>

                        Status

                    </InputLabel>

                    <Select
                        label="Status"
                        value={statusFilter}
                        onChange={handleFilterChange}
                    >

                        <MenuItem value="ALL">
                            All Jobs
                        </MenuItem>

                        <MenuItem value="CREATED">
                            Created
                        </MenuItem>

                        <MenuItem value="STARTING">
                            Starting
                        </MenuItem>

                        <MenuItem value="RUNNING">
                            Running
                        </MenuItem>

                        <MenuItem value="COMPLETED">
                            Completed
                        </MenuItem>

                        <MenuItem value="FAILED">
                            Failed
                        </MenuItem>

                        <MenuItem value="STOPPED">
                            Stopped
                        </MenuItem>

                        <MenuItem value="CANCELLED">
                            Cancelled
                        </MenuItem>

                    </Select>

                </FormControl>

            </Box>

            <TableContainer
                sx={{
                    maxHeight: 280,
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
                                Job ID
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 13,
                                    letterSpacing: 0.6,
                                    textTransform: "uppercase",
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
                                }}
                            >
                                Progress
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 13,
                                    letterSpacing: 0.6,
                                    textTransform: "uppercase",
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
                                    colSpan={6}
                                >
                                    Loading...
                                </TableCell>

                            </TableRow>

                        )}

                        {!isLoading &&
                            filteredJobs.length === 0 && (

                            <TableRow>

                                <TableCell
                                    colSpan={6}
                                    align="center"
                                    sx={{
                                        py: 4,
                                        color: "text.secondary",
                                    }}
                                >

                                    No training jobs found.

                                </TableCell>

                            </TableRow>

                        )}

                        {filteredJobs.map(job => (

                            <TableRow

                                key={job.id}

                                hover

                                sx={{
                                    cursor: "pointer",

                                    "&:last-child td": {
                                        borderBottom: 0,
                                    },
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

                                    <Typography
                                        fontWeight={600}
                                    >

                                        {job.name}

                                    </Typography>

                                </TableCell>

                                <TableCell>

                                    {job.strategy}

                                </TableCell>

                                <TableCell>

                                    <Chip

                                        label={job.status}

                                        color={statusColor(job.status)}

                                        size="small"

                                        variant={
                                            job.status === "COMPLETED"
                                                ? "outlined"
                                                : "filled"
                                        }

                                    />

                                </TableCell>

                                <TableCell>

                                    {job.total_rounds > 0
                                        ? `${job.current_round}/${job.total_rounds}`
                                        : "-"}

                                </TableCell>

                                <TableCell>

                                    {job.started_at
                                        ? new Date(
                                              job.started_at,
                                          ).toLocaleString()
                                        : "-"}

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

                    Showing {filteredJobs.length} of {jobs.length} training jobs

                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >

                    Click a job to view its details.

                </Typography>

            </Box>

        </Paper>

    );

}