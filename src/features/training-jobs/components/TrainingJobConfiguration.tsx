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

export default function TrainingJobConfiguration({
    job,
}: Props) {

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Configuration
                </Typography>

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Typography>

                            Local Epochs

                        </Typography>

                        <Typography
                            fontWeight={600}
                        >

                            {job.local_epochs}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Typography>

                            Batch Size

                        </Typography>

                        <Typography
                            fontWeight={600}
                        >

                            {job.batch_size}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Typography>

                            Learning Rate

                        </Typography>

                        <Typography
                            fontWeight={600}
                        >

                            {job.learning_rate}

                        </Typography>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}