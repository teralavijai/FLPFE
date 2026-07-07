import {
    Card,
    CardContent,
    LinearProgress,
    Stack,
    Typography,
} from "@mui/material";

import type { TrainingJob } from "../types/trainingJob";

interface Props {
    job: TrainingJob;
}

export default function TrainingJobProgress({
    job,
}: Props) {

    const progress =
        job.total_rounds === 0
            ? 0
            : Math.round(
                  job.current_round *
                      100 /
                      job.total_rounds
              );

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Progress
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={progress}
                />

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    mt={2}
                >

                    <Typography>

                        Round

                    </Typography>

                    <Typography>

                        {job.current_round}

                        /

                        {job.total_rounds}

                    </Typography>

                </Stack>

            </CardContent>

        </Card>

    );

}