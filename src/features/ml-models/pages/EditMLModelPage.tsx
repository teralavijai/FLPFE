import {
    Alert,
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import MLModelForm from "../components/MLModelForm";

import { useMLModel } from "../hooks/useMLModel";
import { useUpdateMLModel } from "../hooks/useUpdateMLModel";

import { Snackbar } from "@mui/material";
import { useState } from "react";

import type { UpdateMLModelRequest } from "../types/mlModel";

export default function EditMLModelPage() {

    const { id } = useParams();

    const navigate = useNavigate();
    
    const [message, setMessage] = useState("");

    const updateMutation =
        useUpdateMLModel();

    const {
        data: model,
        isLoading,
        error,
    } = useMLModel(Number(id));

    if (isLoading)
        return (
            <Box display="flex" justifyContent="center" mt={6}>
                <CircularProgress />
            </Box>
        );

    if (error || !model)
        return (
            <Alert severity="error">
                Failed to load ML Model.
            </Alert>
        );

    function handleSubmit(
        payload: UpdateMLModelRequest
    ) {

        updateMutation.mutate(
            {
                id: model.id,
                payload,
            },
            {

                onSuccess: (response) => {

                    setMessage(response.message);

                    setTimeout(() => {

                        navigate("/ml-models");

                    }, 600);

                },

            }
        );

    }

    return (

        <>

            <Typography
                variant="h4"
                mb={3}
            >
                Edit ML Model
            </Typography>

            <MLModelForm

                model={model}

                loading={updateMutation.isPending}

                onSubmit={handleSubmit}

                onCancel={() =>
                    navigate("/ml-models")
                }

            />

            <Snackbar

                open={message.length > 0}

                autoHideDuration={3000}

                onClose={() => setMessage("")}

                message={message}

            />

        </>

    );

}