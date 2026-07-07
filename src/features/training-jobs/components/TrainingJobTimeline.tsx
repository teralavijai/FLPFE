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

function value(date?: string | null) {
    return date ?? "-";
}

export default function TrainingJobTimeline({
    job,
}: Props) {

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Timeline
                </Typography>

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12 }}>

                        <Typography color="text.secondary">
                            Created
                        </Typography>

                        <Typography>
                            {value(job.created_at)}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <Typography color="text.secondary">
                            Started
                        </Typography>

                        <Typography>
                            {value(job.started_at)}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <Typography color="text.secondary">
                            Completed
                        </Typography>

                        <Typography>
                            {value(job.completed_at)}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <Typography color="text.secondary">
                            Cancelled
                        </Typography>

                        <Typography>
                            {value(job.cancelled_at)}
                        </Typography>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}