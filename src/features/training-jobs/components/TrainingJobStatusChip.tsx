import Chip from "@mui/material/Chip";

interface Props {
    status: string;
}

const colorMap: Record<
    string,
    "default" | "success" | "warning" | "error" | "info"
> = {
    CREATED: "default",
    RUNNING: "success",
    COMPLETED: "info",
    FAILED: "error",
    CANCELLED: "warning",
};

export default function TrainingJobStatusChip({
    status,
}: Props) {
    return (
        <Chip
            size="small"
            label={status}
            color={colorMap[status] ?? "default"}
        />
    );
}