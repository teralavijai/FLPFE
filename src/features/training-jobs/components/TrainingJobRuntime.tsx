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

export default function TrainingJobRuntime({ job }: Props) {

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Runtime
                </Typography>

                <Grid container spacing={2}>

                    <Grid size={{ xs: 6 }}>

                        <Typography color="text.secondary">
                            Status
                        </Typography>

                        <Typography>
                            {job.status}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 6 }}>

                        <Typography color="text.secondary">
                            Runtime
                        </Typography>

                        <Typography>
                            --
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 6 }}>

                        <Typography color="text.secondary">
                            PID
                        </Typography>

                        <Typography>
                            --
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 6 }}>

                        <Typography color="text.secondary">
                            Port
                        </Typography>

                        <Typography>
                            --
                        </Typography>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}