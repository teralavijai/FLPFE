import {
    Backdrop,
    CircularProgress,
} from "@mui/material";

interface Props {
    open: boolean;
}

export default function LoadingOverlay({
    open,
}: Props) {
    return (
        <Backdrop
            open={open}
            sx={{
                zIndex: 9999,
            }}
        >
            <CircularProgress />
        </Backdrop>
    );
}