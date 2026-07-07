import {
    Box,
    Typography,
} from "@mui/material";

interface Props {
    title: string;
}

export default function EmptyState({
    title,
}: Props) {
    return (
        <Box
            py={10}
            textAlign="center"
        >
            <Typography variant="h6">
                {title}
            </Typography>

            <Typography
                color="text.secondary"
            >
                No records found.
            </Typography>
        </Box>
    );
}