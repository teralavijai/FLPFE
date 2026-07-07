import {
    Alert,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

interface Props{
    jobId:number;
}

export default function TrainingJobLogs({
    jobId,
}:Props){

    return(

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Logs
                </Typography>

                <Alert severity="info">

                    Log streaming endpoint for
                    Training Job <b>{jobId}</b>
                    will be connected in the
                    Runtime Monitoring module.

                </Alert>

            </CardContent>

        </Card>

    );

}