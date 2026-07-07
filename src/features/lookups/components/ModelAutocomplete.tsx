import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useModels } from "../hooks/useModels";

import type { ModelLookup } from "../types/lookup";

interface Props {

    value: number;

    onChange(
        modelId: number
    ): void;

    label?: string;

}

export default function ModelAutocomplete({

    value,

    onChange,

    label = "Model",

}: Props) {

    const {

        data = [],

        isLoading,

    } = useModels();

    const selected = data.find(
        model => model.id === value
    ) ?? null;

    return (

        <Autocomplete<ModelLookup>

            options={data}

            loading={isLoading}

            value={selected}

            getOptionLabel={(option) =>
                option.name
            }

            isOptionEqualToValue={(a, b) =>
                a.id === b.id
            }

            onChange={(_, option) =>
                onChange(option?.id ?? 0)
            }

            renderInput={(params) => (

                <TextField
                    {...params}
                    label={label}
                    fullWidth
                />

            )}

        />

    );

}