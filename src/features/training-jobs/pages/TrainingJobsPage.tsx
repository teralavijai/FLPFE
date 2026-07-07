import { useMemo } from "react";

import {
    Alert,
    Box,
    CircularProgress,
    Snackbar,
    Typography,
} from "@mui/material";

import { useTrainingJobs } from "../hooks/useTrainingJobs";
import useTrainingJobsFilters from "../hooks/useTrainingJobsFilters";
import useTrainingJobsPolling from "../hooks/useTrainingJobsPolling";
import useTrainingJobsActions from "../hooks/useTrainingJobsActions";

import TrainingJobsToolbar from "../components/TrainingJobsToolbar";
import TrainingJobsTable from "../tables/TrainingJobsTable";
import ConfirmDeleteDialog from "../dialogs/ConfirmDeleteDialog";

import { useState } from "react";

export default function TrainingJobsPage() {

    const {
        data = [],
        isLoading,
        error,
        refetch,
    } = useTrainingJobs();

    useTrainingJobsPolling({
        jobs: data,
        refetch,
    });

    const {
        search,
        status,
        filteredJobs,
        setSearch,
        setStatus,
    } = useTrainingJobsFilters(data);

    const actions =
        useTrainingJobsActions();

    const [deleteId, setDeleteId] =
        useState<number | null>(null);

    const [message, setMessage] =
        useState("");

    const runningJobs = useMemo(
        () =>
            data.filter(
                (j) => j.status === "RUNNING"
            ).length,
        [data]
    );

    if (isLoading)
        return (
            <Box
                display="flex"
                justifyContent="center"
                mt={8}
            >
                <CircularProgress />
            </Box>
        );

    if (error)
        return (
            <Alert severity="error">
                Failed to load Training Jobs.
            </Alert>
        );

    return (

        <>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={1}
            >
                Training Jobs
            </Typography>

            <Typography
                color="text.secondary"
                mb={3}
            >
                Total Jobs : {data.length}
                {"   |   "}
                Running : {runningJobs}
            </Typography>

            <TrainingJobsToolbar

                search={search}

                status={status}

                onSearchChange={setSearch}

                onStatusChange={setStatus}

                onRefresh={refetch}

                onCreate={
                    actions.createJob
                }

            />

            <TrainingJobsTable

                rows={filteredJobs}

                loading={actions.loading}

                onView={
                    actions.viewJob
                }

                onEdit={
                    actions.editJob
                }

                onStart={(id) => {

                    actions.startJob(id);

                    setMessage(
                        "Training Job Started."
                    );

                }}

                onStop={(id) => {

                    actions.stopJob(id);

                    setMessage(
                        "Training Job Stopped."
                    );

                }}

                onDelete={(id) =>
                    setDeleteId(id)
                }

            />

            <ConfirmDeleteDialog

                open={
                    deleteId !== null
                }

                title="Delete Training Job"

                message="Are you sure you want to delete this Training Job?"

                loading={actions.loading}

                onCancel={() =>
                    setDeleteId(null)
                }

                onConfirm={async () => {

                    if (deleteId == null)
                        return;

                    try {

                        const response =
                            await actions.deleteJob(deleteId);

                        setDeleteId(null);

                        setMessage(response.message);

                    }
                    catch (error: any) {

                        setDeleteId(null);

                        setMessage(
                            error.response?.data?.detail ??
                            "Failed to delete Training Job."
                        );

                    }

                }}
                
            />

            <Snackbar

                open={
                    message.length > 0
                }

                autoHideDuration={3000}

                onClose={() =>
                    setMessage("")
                }

                message={message}

            />

        </>

    );

}