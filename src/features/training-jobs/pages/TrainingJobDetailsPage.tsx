import { useNavigate, useParams } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

import { useTrainingJob } from "../hooks/useTrainingJob";

import TrainingJobOverview from "../components/TrainingJobOverview";
import TrainingJobProgress from "../components/TrainingJobProgress";
import TrainingJobConfiguration from "../components/TrainingJobConfiguration";
import TrainingJobMetrics from "../components/TrainingJobMetrics";
import TrainingJobRuntime from "../components/TrainingJobRuntime";
import TrainingJobTimeline from "../components/TrainingJobTimeline";

export default function TrainingJobDetailsPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const {
        data: job,
        isLoading,
        error,
    } = useTrainingJob(Number(id));

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

    if (error || !job) {

        return (

            <Alert severity="error">

                Unable to load Training Job.

            </Alert>

        );

    }

    return (

        <Stack spacing={3}>

            <Stack

                direction="row"

                justifyContent="space-between"

                alignItems="center"

            >

                <Stack>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >

                        {job.name}

                    </Typography>

                    <Typography
                        color="text.secondary"
                    >

                        Training Job Details

                    </Typography>

                </Stack>

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Button

                        variant="outlined"

                        startIcon={<ArrowBackIcon />}

                        onClick={() =>
                            navigate("/training-jobs")
                        }

                    >

                        Back

                    </Button>

                    <Button

                        variant="contained"

                        startIcon={<EditIcon />}

                        onClick={() =>
                            navigate(
                                `/training-jobs/${job.id}/edit`
                            )
                        }

                    >

                        Edit

                    </Button>

                </Stack>

            </Stack>

            <Grid
                container
                spacing={3}
            >

                <Grid size={{ xs: 12 }}>

                    <TrainingJobOverview
                        job={job}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <TrainingJobProgress
                        job={job}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <TrainingJobMetrics
                        job={job}
                    />

                </Grid>

                <Grid size={{ xs: 12 }}>

                    <TrainingJobConfiguration
                        job={job}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <TrainingJobRuntime
                        job={job}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <TrainingJobTimeline
                        job={job}
                    />

                </Grid>

            </Grid>

        </Stack>

    );

}