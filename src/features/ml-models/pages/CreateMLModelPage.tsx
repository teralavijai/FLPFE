import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

import MLModelForm from "../components/MLModelForm";
import { useCreateMLModel } from "../hooks/useCreateMLModel";

import { Snackbar } from "@mui/material";
import { useState } from "react";

export default function CreateMLModelPage() {

    const navigate = useNavigate();

    const createMutation = useCreateMLModel();

    const [message, setMessage] = useState("");

    function handleSubmit(payload: CreateMLModelRequest) {

        createMutation.mutate(payload, {

            onSuccess: (response) => {

                setMessage(response.message);

                setTimeout(() => {

                    navigate("/ml-models");

                }, 600);

            },

        });

    }

    return (

        <>

            <Typography
                variant="h4"
                mb={3}
            >
                Create ML Model
            </Typography>

            <MLModelForm
                loading={createMutation.isPending}
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