import { useNavigate } from "react-router-dom";

import {
    Box,
    Typography,
} from "@mui/material";

import TrainingJobForm from "../components/TrainingJobForm";

import { useCreateTrainingJob } from "../hooks/useCreateTrainingJob";

export default function CreateTrainingJobPage() {

    const navigate = useNavigate();

    const mutation = useCreateTrainingJob();

    return (

        <Box>

            <Typography
                variant="h4"
                mb={3}
                fontWeight={700}
            >
                Create Training Job
            </Typography>

            <TrainingJobForm

                loading={mutation.isPending}

                onSubmit={async (data) => {

                    await mutation.mutateAsync(data);

                    navigate("/training-jobs");

                }}

            />

        </Box>

    );

}