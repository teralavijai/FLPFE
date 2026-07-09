import { Button, Stack, TextField } from "@mui/material";

interface Props {

    search: string;

    onSearchChange(
        value: string
    ): void;

    onCreate(): void;

    onRefresh(): void;

}

export default function MLModelsToolbar({

    search,

    onSearchChange,

    onCreate,

    onRefresh,

}: Props) {

    return (

        <Stack
            direction="row"
            spacing={2}
            mb={3}
        >

            <TextField

                label="Search Models"

                value={search}

                onChange={(e)=>
                    onSearchChange(e.target.value)
                }

                sx={{width:320}}

            />

            <Button
                variant="outlined"
                onClick={onRefresh}
            >
                Refresh
            </Button>

            <Button
                variant="contained"
                onClick={onCreate}
            >
                New Model
            </Button>

        </Stack>

    );

}