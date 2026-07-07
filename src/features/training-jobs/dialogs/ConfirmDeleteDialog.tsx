import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

interface Props {
    open: boolean;
    title: string;
    message: string;
    loading?: boolean;
    onConfirm(): void;
    onCancel(): void;
}

export default function ConfirmDeleteDialog({
    open,
    title,
    message,
    loading = false,
    onConfirm,
    onCancel,
}: Props) {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                {title}
            </DialogTitle>

            <DialogContent>

                <DialogContentText>
                    {message}
                </DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={onConfirm}
                    disabled={loading}
                >
                    Delete
                </Button>

            </DialogActions>

        </Dialog>
    );
}