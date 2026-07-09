import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import MLModelForm from "../components/MLModelForm";

import { useMLModel } from "../hooks/useMLModel";

export default function MLModelDetailsPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const {
        data: model,
        isLoading,
        error,
    } = useMLModel(Number(id));

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

    if (error || !model) {

        return (

            <Alert severity="error">

                Failed to load ML Model.

            </Alert>

        );

    }

    return (

        <>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >

                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    ML Model Details
                </Typography>

                <Button
                    variant="outlined"
                    onClick={() =>
                        navigate("/ml-models")
                    }
                >
                    Back
                </Button>

            </Stack>

            <MLModelForm

                model={model}

                readonly={true}

                onSubmit={() => {}}

            />

        </>

    );

}