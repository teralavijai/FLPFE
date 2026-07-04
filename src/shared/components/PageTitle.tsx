import { Typography } from "@mui/material";

interface Props {
    title: string;
    subtitle?: string;
}

export default function PageTitle({
    title,
    subtitle,
}: Props) {
    return (
        <>
            <Typography
                variant="h4"
                fontWeight={600}
                gutterBottom
            >
                {title}
            </Typography>

            {subtitle && (
                <Typography
                    variant="body1"
                    color="text.secondary"
                    mb={4}
                >
                    {subtitle}
                </Typography>
            )}
        </>
    );
}
