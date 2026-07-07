import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

import {
    Box,
    Button,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";

interface Props {

    search: string;

    status: string;

    onSearchChange(value: string): void;

    onStatusChange(value: string): void;

    onRefresh(): void;

    onCreate(): void;

}

export default function TrainingJobsToolbar({

    search,

    status,

    onSearchChange,

    onStatusChange,

    onRefresh,

    onCreate,

}: Props) {

    return (

        <Stack

            direction={{
                xs: "column",
                md: "row",
            }}

            spacing={2}

            justifyContent="space-between"

            mb={3}

        >

            <Stack

                direction={{
                    xs: "column",
                    md: "row",
                }}

                spacing={2}

                flex={1}

            >

                <TextField

                    placeholder="Search Training Jobs..."

                    value={search}

                    onChange={(e)=>
                        onSearchChange(e.target.value)
                    }

                    sx={{minWidth:320}}

                    InputProps={{

                        startAdornment:(

                            <InputAdornment position="start">

                                <SearchIcon/>

                            </InputAdornment>

                        )

                    }}

                />

                <TextField

                    select

                    value={status}

                    sx={{width:220}}

                    onChange={(e)=>
                        onStatusChange(e.target.value)
                    }

                    InputProps={{

                        startAdornment:(

                            <InputAdornment position="start">

                                <FilterListIcon/>

                            </InputAdornment>

                        )

                    }}

                >

                    <MenuItem value="">
                        All Status
                    </MenuItem>

                    <MenuItem value="CREATED">
                        Created
                    </MenuItem>

                    <MenuItem value="RUNNING">
                        Running
                    </MenuItem>

                    <MenuItem value="COMPLETED">
                        Completed
                    </MenuItem>

                    <MenuItem value="FAILED">
                        Failed
                    </MenuItem>

                    <MenuItem value="CANCELLED">
                        Cancelled
                    </MenuItem>

                </TextField>

            </Stack>

            <Box>

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Button

                        variant="outlined"

                        startIcon={<RefreshIcon/>}

                        onClick={onRefresh}

                    >

                        Refresh

                    </Button>

                    <Button

                        variant="contained"

                        startIcon={<AddIcon/>}

                        onClick={onCreate}

                    >

                        New Training Job

                    </Button>

                </Stack>

            </Box>

        </Stack>

    );

}