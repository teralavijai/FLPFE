import {
    Box,
    IconButton,
    LinearProgress,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import type {
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import TrainingJobStatusChip from "../components/TrainingJobStatusChip";

import type { TrainingJob } from "../types/trainingJob";

interface Props {

    rows: TrainingJob[];

    loading?: boolean;

    onView(id: number): void;

    onEdit(id: number): void;

    onStart(id: number): void;

    onStop(id: number): void;

    onDelete(id: number): void;

}

export default function TrainingJobsTable({

    rows,

    loading = false,

    onView,

    onEdit,

    onStart,

    onStop,

    onDelete,

}: Props) {

    const columns: GridColDef[] = [

        {
            field: "id",
            headerName: "ID",
            width: 90,
        },

        {
            field: "name",
            headerName: "Training Job",
            flex: 1.4,
            minWidth: 220,
        },

        {
            field: "strategy",
            headerName: "Strategy",
            width: 140,
        },

        {
            field: "status",
            headerName: "Status",
            width: 150,

            renderCell: (params) => (

                <TrainingJobStatusChip
                    status={params.value}
                />

            ),
        },

        {
            field: "progress",

            headerName: "Progress",

            width: 220,

            sortable: false,

            renderCell: (params) => {

                const value =
                    params.row.total_rounds === 0
                        ? 0
                        : Math.round(
                              params.row.current_round *
                                  100 /
                                  params.row.total_rounds
                          );

                return (

                    <Stack
                        width="100%"
                        spacing={0.5}
                    >

                        <LinearProgress
                            variant="determinate"
                            value={value}
                        />

                        <Typography
                            variant="caption"
                        >
                            {params.row.current_round}
                            /
                            {params.row.total_rounds}
                        </Typography>

                    </Stack>

                );

            },

        },

        {
            field: "created_at",

            headerName: "Created",

            width: 180,
        },

        {

            field: "actions",

            headerName: "",

            width: 220,

            sortable: false,

            filterable: false,

            renderCell: (params) => (

                <Stack
                    direction="row"
                    spacing={0.5}
                >

                    <Tooltip title="View">

                        <IconButton
                            onClick={() =>
                                onView(
                                    params.row.id
                                )
                            }
                        >

                            <VisibilityIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Edit">

                        <IconButton
                            disabled={params.row.status !== "CREATED"}
                            onClick={() =>
                                onEdit(
                                    params.row.id
                                )
                            }
                        >

                            <EditIcon />

                        </IconButton>

                    </Tooltip>

                    {params.row.status ===
                    "RUNNING" ? (

                        <Tooltip title="Stop">

                            <IconButton
                                color="warning"
                                onClick={() =>
                                    onStop(
                                        params.row.id
                                    )
                                }
                            >

                                <StopIcon />

                            </IconButton>

                        </Tooltip>

                    ) : (

                        <Tooltip title="Start">

                            <IconButton
                                color="success"
                                disabled={params.row.status !== "CREATED"}
                                onClick={() =>
                                    onStart(
                                        params.row.id
                                    )
                                }
                            >

                                <PlayArrowIcon />

                            </IconButton>

                        </Tooltip>

                    )}

                    <Tooltip title="Delete">

                        <IconButton
                            color="error"
                            disabled={params.row.status !== "CREATED"}
                            onClick={() =>
                                onDelete(
                                    params.row.id
                                )
                            }
                        >

                            <DeleteIcon />

                        </IconButton>

                    </Tooltip>

                </Stack>

            ),

        },

    ];

    return (

        <Box
            sx={{
                height: 650,
                width: "100%",
            }}
        >

            <DataGrid

                rows={rows}

                columns={columns}

                loading={loading}

                disableRowSelectionOnClick

                pageSizeOptions={[
                    10,
                    25,
                    50,
                    100,
                ]}

                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                            page: 0,
                        },
                    },
                }}

                onRowDoubleClick={(params) =>
                    onView(params.row.id)
                }

                sx={{

                    border: 0,

                    "& .MuiDataGrid-columnHeaders": {

                        fontWeight: 700,

                        fontSize: 15,

                    },

                    "& .MuiDataGrid-row:hover": {

                        cursor: "pointer",

                    },

                }}

            />

        </Box>

    );

}