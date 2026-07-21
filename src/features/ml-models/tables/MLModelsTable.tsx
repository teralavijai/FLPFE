import {
    Box,
    IconButton,
    Stack,
    Tooltip,
} from "@mui/material";

import {
    DataGrid,
} from "@mui/x-data-grid";

import type {
    GridColDef,
} from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { MLModel } from "../types/mlModel";

interface Props {

    rows: MLModel[];

    loading?: boolean;

    onView(id: number): void;

    onEdit(id: number): void;

    onDelete(id: number): void;

}

export default function MLModelsTable({

    rows,

    loading = false,

    onView,

    onEdit,

    onDelete,

}: Props) {

    const columns: GridColDef[] = [

        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 220,
        },

        {
            field: "version",
            headerName: "Version",
            width: 100,
        },

        {
            field: "fl_framework",
            headerName: "FL Framework",
            width: 160,
        },
        {
            field: "ml_framework",
            headerName: "ML Framework",
            width: 160,
        },
        {
            field: "task_type",
            headerName: "Task",
            width: 160,
        },

        {
            field: "is_public",
            headerName: "Public",
            width: 100,
            valueGetter: (_, row) =>
                row.is_public ? "Yes" : "No",
        },

        {
            field: "actions",

            headerName: "",

            width: 140,

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
                                onView(params.row.id)
                            }
                        >

                            <VisibilityIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Edit">

                        <IconButton
                            onClick={() =>
                                onEdit(params.row.id)
                            }
                        >

                            <EditIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Delete">

                        <IconButton
                            color="error"
                            onClick={() =>
                                onDelete(params.row.id)
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