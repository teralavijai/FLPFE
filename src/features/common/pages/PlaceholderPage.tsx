import { Typography } from "@mui/material";
import PageContainer from "../../../shared/components/PageContainer";

interface Props {
    title: string;
}

export default function PlaceholderPage({ title }: Props) {
    return (
        <PageContainer>
            <Typography variant="h4">{title}</Typography>

            <Typography
                sx={{ mt: 2 }}
                color="text.secondary"
            >
                Module coming in a later sprint.
            </Typography>
        </PageContainer>
    );
}
