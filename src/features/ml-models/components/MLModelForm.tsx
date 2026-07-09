import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
    MenuItem,
} from "@mui/material";

import { useLookups } from "../../lookups/hooks/useLookups";

import type {
    CreateMLModelRequest,
    MLModel,
} from "../types/mlModel";

interface Props {

    model?: MLModel;

    loading?: boolean;

    readonly?: boolean;

    onSubmit(
        data: CreateMLModelRequest
    ): void;

    onCancel?(): void;

}

const defaultValues: CreateMLModelRequest = {

    name: "",

    version: "1",

    description: "",

    framework: "",

    architecture: "",

    task_type: "",

    weights_path: "",

    config_path: "",

    is_pretrained: false,

    is_public: true,

};

export default function MLModelForm({

    model,

    loading,

    readonly = false,

    onSubmit,

    onCancel,

}: Props) {

    const {

        data: lookups,

    } = useLookups();

    const {

        control,

        handleSubmit,

        reset,

    } = useForm<CreateMLModelRequest>({
        defaultValues,
    });

    useEffect(() => {

        if (!model) {

            reset(defaultValues);

            return;

        }

        reset({

            name: model.name,

            version: model.version,

            description:
                model.description ?? "",

            framework: model.framework,

            architecture:
                model.architecture ?? "",

            task_type:
                model.task_type,

            weights_path:
                model.weights_path ?? "",

            config_path:
                model.config_path ?? "",

            is_pretrained:
                model.is_pretrained,

            is_public:
                model.is_public,

        });

    }, [model, reset]);

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
        >

            <Paper sx={{ p: 3 }}>

                <Typography
                    variant="h6"
                    mb={3}
                >
                    General Information
                </Typography>

                <Grid
                    container
                    spacing={3}
                >

                    <Grid size={{ xs:12, md:6 }}>

                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required:
                                    "Model Name is required",
                            }}
                            render={({
                                field,
                                fieldState,
                            }) => (

                                <TextField
                                    {...field}
                                    label="Model Name"
                                    disabled={readonly}
                                    fullWidth
                                    error={
                                        !!fieldState.error
                                    }
                                    helperText={
                                        fieldState.error
                                            ?.message
                                    }
                                />

                            )}
                        />

                    </Grid>

                    <Grid size={{ xs:12, md:3 }}>

                        <Controller
                            name="version"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    label="Version"
                                    disabled={readonly}
                                    fullWidth
                                />

                            )}
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
                                    disabled={readonly}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />

                            )}
                        />

                    </Grid>

                </Grid>

                <Typography
                    variant="h6"
                    mt={5}
                    mb={3}
                >
                    Configuration
                </Typography>

                <Grid
                    container
                    spacing={3}
                >

                    <Grid size={{ xs:12, md:4 }}>

                        <Controller
                            name="framework"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    select
                                    label="Framework"
                                    disabled={readonly}
                                    fullWidth
                                >

                                    {lookups?.frameworks.map(
                                        item => (

                                            <MenuItem
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </MenuItem>

                                        )
                                    )}

                                </TextField>

                            )}
                        />

                    </Grid>

                    <Grid size={{ xs:12, md:4 }}>

                        <Controller
                            name="task_type"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    select
                                    label="Task Type"
                                    disabled={readonly}
                                    fullWidth
                                >

                                    {lookups?.task_types.map(
                                        item => (

                                            <MenuItem
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </MenuItem>

                                        )
                                    )}

                                </TextField>

                            )}
                        />

                    </Grid>

                    <Grid size={{ xs:12, md:4 }}>

                        <Controller
                            name="architecture"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    label="Architecture"
                                    disabled={readonly}
                                    fullWidth
                                />

                            )}
                        />

                    </Grid>

                    <Grid size={12}>

                        <Controller
                            name="weights_path"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    label="Weights Path"
                                    disabled={readonly}
                                    fullWidth
                                />

                            )}
                        />

                    </Grid>

                    <Grid size={12}>

                        <Controller
                            name="config_path"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    label="Config Path"
                                    disabled={readonly}
                                    fullWidth
                                />

                            )}
                        />

                    </Grid>

                </Grid>

                <Typography
                    variant="h6"
                    mt={5}
                    mb={3}
                >
                    Visibility
                </Typography>

                <Stack>

                    <Controller
                        name="is_pretrained"
                        control={control}
                        render={({ field }) => (

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            field.value
                                        }
                                        disabled={readonly}
                                        onChange={e =>
                                            field.onChange(
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Pretrained Model"
                            />

                        )}
                    />

                    <Controller
                        name="is_public"
                        control={control}
                        render={({ field }) => (

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            field.value
                                        }
                                        disabled={readonly}
                                        onChange={e =>
                                            field.onChange(
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Public Model"
                            />

                        )}
                    />

                </Stack>

                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                    mt={4}
                >

                    {!readonly && onCancel && (

                        <Button
                            variant="outlined"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>

                    )}

                    {!readonly && (

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            Save
                        </Button>

                    )}

                </Stack>

            </Paper>

        </form>

    );

}