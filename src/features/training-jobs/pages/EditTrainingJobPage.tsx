import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";

import TrainingJobForm from "../components/TrainingJobForm";

import { useTrainingJob } from "../hooks/useTrainingJob";

import { useUpdateTrainingJob } from "../hooks/useUpdateTrainingJob";

export default function EditTrainingJobPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    const {
        data,
        isLoading,
    } = useTrainingJob(Number(id));

    const mutation = useUpdateTrainingJob();

    if (isLoading)
        return <CircularProgress />;

    if (!data)
        return null;

    return (

        <Box>

            <Typography
                variant="h4"
                mb={3}
                fontWeight={700}
            >
                Edit Training Job
            </Typography>

            <TrainingJobForm

                job={data}

                loading={mutation.isPending}

                onSubmit={async (request) => {

                    await mutation.mutateAsync({

                        id: data.id,

                        payload: request,

                    });

                    navigate("/training-jobs");

                }}

            />

        </Box>

    );

}