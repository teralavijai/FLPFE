import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
    Button,
    Grid,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import ModelAutocomplete from "../../lookups/components/ModelAutocomplete";

import type {
    CreateTrainingJobRequest,
    TrainingJob,
} from "../types/trainingJob";

interface Props {
    job?: TrainingJob;
    loading?: boolean;
    onSubmit(
        data: CreateTrainingJobRequest
    ): void;
    onCancel?(): void;
}

const defaultValues: CreateTrainingJobRequest = {
    name: "",
    description: "",
    model_id: 0,
    strategy: "FedAvg",
    dataset_name: "",
    total_rounds: 10,
    local_epochs: 1,
    batch_size: 32,
    learning_rate: 0.001,
    fraction_fit: 1,
    fraction_evaluate: 1,
    min_fit_clients: 1,
    min_evaluate_clients: 1,
    min_available_clients: 1,
};

export default function TrainingJobForm({
    job,
    loading = false,
    onSubmit,
    onCancel,
}: Props) {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
    } = useForm<CreateTrainingJobRequest>({
        defaultValues,
    });

    useEffect(() => {
        if (!job) {
            reset(defaultValues);
            return;
        }

        reset({
            name: job.name,
            description: job.description ?? "",
            model_id: job.model_id ?? 0,
            strategy: job.strategy,
            dataset_name: "",
            total_rounds: job.total_rounds,
            local_epochs: job.local_epochs ?? 1,
            batch_size: job.batch_size ?? 32,
            learning_rate: job.learning_rate ?? 0.001,
            fraction_fit: job.fraction_fit ?? 1,
            fraction_evaluate: job.fraction_evaluate ?? 1,
            min_fit_clients: job.min_fit_clients,
            min_evaluate_clients:
                job.min_evaluate_clients ?? 1,
            min_available_clients:
                job.min_available_clients,
        });
    }, [job, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Paper sx={{ p: 3 }}>

                <Typography
                    variant="h6"
                    mb={3}
                >
                    Training Configuration
                </Typography>

                <Grid
                    container
                    spacing={3}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required:
                                    "Training Job Name is required",
                            }}
                            render={({
                                field,
                                fieldState,
                            }) => (
                                <TextField
                                    {...field}
                                    label="Training Job Name"
                                    fullWidth
                                    disabled={loading}
                                    error={!!fieldState.error}
                                    helperText={
                                        fieldState.error?.message
                                    }
                                />
                            )}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <ModelAutocomplete
                            value={watch("model_id")}
                            onChange={(id) =>
                                setValue(
                                    "model_id",
                                    id
                                )
                            }
                            disabled={loading}
                        />

                    </Grid>

                    <Grid size={12}>

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    disabled={loading}
                                />
                            )}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Controller
                            name="strategy"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    select
                                    label="Strategy"
                                    fullWidth
                                    disabled={loading}
                                >

                                    <MenuItem value="FedAvg">
                                        FedAvg
                                    </MenuItem>

                                    <MenuItem value="FedAdam">
                                        FedAdam
                                    </MenuItem>

                                    <MenuItem value="FedProx">
                                        FedProx
                                    </MenuItem>

                                    <MenuItem value="FedYogi">
                                        FedYogi
                                    </MenuItem>

                                </TextField>

                            )}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Controller
                            name="total_rounds"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    label="Total Rounds"
                                    fullWidth
                                    disabled={loading}
                                    onChange={(e) =>
                                        field.onChange(
                                            Number(
                                                e.target.value
                                            )
                                        )
                                    }
                                />
                            )}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Controller
                            name="local_epochs"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    label="Local Epochs"
                                    fullWidth
                                    disabled={loading}
                                    onChange={(e) =>
                                        field.onChange(
                                            Number(
                                                e.target.value
                                            )
                                        )
                                    }
                                />
                            )}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Controller
                            name="batch_size"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    label="Batch Size"
                                    fullWidth
                                    disabled={loading}
                                    onChange={(e) =>
                                        field.onChange(
                                            Number(
                                                e.target.value
                                            )
                                        )
                                    }
                                />
                            )}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Controller
                            name="learning_rate"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    label="Learning Rate"
                                    inputProps={{
                                        step: 0.0001,
                                    }}
                                    fullWidth
                                    disabled={loading}
                                    onChange={(e) =>
                                        field.onChange(
                                            Number(
                                                e.target.value
                                            )
                                        )
                                    }
                                />
                            )}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Controller
                            name="min_fit_clients"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    label="Min Fit Clients"
                                    fullWidth
                                    disabled={loading}
                                    onChange={(e) =>
                                        field.onChange(
                                            Number(
                                                e.target.value
                                            )
                                        )
                                    }
                                />
                            )}
                        />

                    </Grid>

                </Grid>

                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    mt={4}
                >

                    {onCancel && (

                        <Button
                            variant="outlined"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </Button>

                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                    >
                        {job
                            ? "Update Training Job"
                            : "Create Training Job"}
                    </Button>

                </Stack>

            </Paper>

        </form>
    );
}