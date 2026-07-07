import {
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

import type { TrainingJob } from "../types/trainingJob";

interface Props {
    job: TrainingJob;
}

export default function TrainingJobMetrics({ job }: Props) {

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Metrics
                </Typography>

                <Grid container spacing={3}>

                    <Grid size={{ xs: 6 }}>

                        <Typography color="text.secondary">
                            Best Accuracy
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {job.best_accuracy ?? "-"}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 6 }}>

                        <Typography color="text.secondary">
                            Best Loss
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {job.best_loss ?? "-"}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 6 }}>

                        <Typography color="text.secondary">
                            Current Round
                        </Typography>

                        <Typography>
                            {job.current_round}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 6 }}>

                        <Typography color="text.secondary">
                            Total Rounds
                        </Typography>

                        <Typography>
                            {job.total_rounds}
                        </Typography>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}