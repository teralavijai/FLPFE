import {
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import TrainingJobStatusChip from "./TrainingJobStatusChip";
import type { TrainingJob } from "../types/trainingJob";

interface Props {
    job: TrainingJob;
}

export default function TrainingJobOverview({ job }: Props) {

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Overview
                </Typography>

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Stack spacing={2}>

                            <Typography>

                                <strong>Name:</strong>

                                {" "}

                                {job.name}

                            </Typography>

                            <Typography>

                                <strong>Strategy:</strong>

                                {" "}

                                {job.strategy}

                            </Typography>

                            <Typography>

                                <strong>Status:</strong>

                            </Typography>

                            <TrainingJobStatusChip
                                status={job.status}
                            />

                        </Stack>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Stack spacing={2}>

                            <Typography>

                                <strong>Total Rounds:</strong>

                                {" "}

                                {job.total_rounds}

                            </Typography>

                            <Typography>

                                <strong>Current Round:</strong>

                                {" "}

                                {job.current_round}

                            </Typography>

                            <Typography>

                                <strong>Created:</strong>

                                {" "}

                                {job.created_at}

                            </Typography>

                        </Stack>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}