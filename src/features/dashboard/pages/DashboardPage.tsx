import {
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

import PageContainer from "../../../shared/components/PageContainer";
import PageTitle from "../../../shared/components/PageTitle";

const cards = [
    "Training Jobs",
    "ML Models",
    "Runtime Monitoring",
    "Connected Agents",
];

export default function DashboardPage() {
    return (
        <PageContainer>
            <PageTitle
                title="Dashboard"
                subtitle="Federated Learning Platform Overview"
            />

            <Grid container spacing={3}>
                {cards.map((title) => (
                    <Grid
                        key={title}
                        size={{ xs: 12, sm: 6, lg: 3 }}
                    >
                        <Card
                            elevation={0}
                            sx={{
                                border:1,
                                borderColor:"divider",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6">
                                    {title}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                >
                                    Placeholder widget
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </PageContainer>
    );
}
