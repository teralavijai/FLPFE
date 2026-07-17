import {
    useEffect,
    useState,
} from "react";

import {
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

import { formatRuntime } from "../../../utils/runtime";

import type { TrainingJob } from "../types/trainingJob";

interface Props {
    job: TrainingJob;
}

export default function TrainingJobRuntime({ job }: Props) {
    const [, setTick] = useState(0);

    useEffect(() => {

        if (
            job.status !== "RUNNING" ||
            !job.started_at
        ) {
            return;
        }

        const timer = window.setInterval(() => {

            setTick(v => v + 1);

        }, 1000);

        return () => {

            clearInterval(timer);

        };

    }, [

        job.status,

        job.started_at,

    ]);

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

                            {formatRuntime(

                                job.started_at,

                                job.completed_at,

                            )}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 6 }}>

                        <Typography color="text.secondary">
                            PID
                        </Typography>

                        <Typography>

                            {job.runtime_pid ?? "--"}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 6 }}>

                        <Typography color="text.secondary">
                            Port
                        </Typography>

                        <Typography>

                            {job.runtime_port ?? "--"}

                        </Typography> 

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}