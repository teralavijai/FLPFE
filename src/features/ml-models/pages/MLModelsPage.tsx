import { useMemo, useState } from "react";

import {
    Alert,
    Box,
    CircularProgress,
    Typography,
    Snackbar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useMLModels } from "../hooks/useMLModels";
import useMLModelsActions from "../hooks/useMLModelsActions";
import ConfirmDeleteDialog from "../dialogs/ConfirmDeleteDialog";

import MLModelsToolbar from "../components/MLModelsToolbar";
import MLModelsTable from "../tables/MLModelsTable";



export default function MLModelsPage() {

    const navigate = useNavigate();
    const actions = useMLModelsActions();

    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [message, setMessage] = useState("");

    const {
        data = [],
        isLoading,
        error,
        refetch,
    } = useMLModels();

    const [search, setSearch] = useState("");

    const filteredModels = useMemo(() => {

        if (!search.trim()) {
            return data;
        }

        const value = search.toLowerCase();

        return data.filter(
            (model) =>
                model.name
                    .toLowerCase()
                    .includes(value) ||
                model.framework
                    .toLowerCase()
                    .includes(value) ||
                model.task_type
                    .toLowerCase()
                    .includes(value)
        );

    }, [data, search]);

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                mt={8}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                Failed to load ML Models.
            </Alert>
        );
    }

    return (
        <>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >
                ML Models
            </Typography>

            <MLModelsToolbar
                search={search}
                onSearchChange={setSearch}
                onRefresh={refetch}
                onCreate={() =>
                    navigate("/ml-models/new")
                }
            />

           <MLModelsTable

                rows={filteredModels}

                loading={actions.loading}

                onView={actions.viewModel}

                onEdit={actions.editModel}

                onDelete={(id) =>
                    setDeleteId(id)
                }

            />

            <ConfirmDeleteDialog

                open={deleteId !== null}

                title="Delete ML Model"

                message="Are you sure you want to delete this model?"

                loading={actions.loading}

                onCancel={() =>
                    setDeleteId(null)
                }

                onConfirm={() => {

                    if (deleteId == null)
                        return;

                    actions.deleteModel(
                        deleteId,
                            {

                                onSuccess: (response) => {

                                    setMessage(
                                        response.message
                                    );

                                    setDeleteId(null);

                                },

                                onError: (error: any) => {

                                    setMessage(

                                        error?.response?.data?.detail ??

                                        "Failed to delete ML Model."

                                    );

                                    setDeleteId(null);

                                },

                            }
                    );

                }}

            />
            <Snackbar

                open={message.length > 0}

                autoHideDuration={3000}

                onClose={() =>
                    setMessage("")
                }

                message={message}

            />
        </>
    );

}