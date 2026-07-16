import { useEffect, useMemo } from "react";

import {
    Box,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import ListAltIcon from '@mui/icons-material/ListAlt';

import { useRuntime } from "../../../hooks/useRuntime";

export default function ConnectedClientsTable() {

    const {

        clients,

        initializeClients,

    } = useRuntime();

    //------------------------------------------------------------------
    // Load Clients
    //------------------------------------------------------------------

    useEffect(() => {

        initializeClients();

    }, [initializeClients]);

    //------------------------------------------------------------------
    // Sort Clients
    //------------------------------------------------------------------

    const sortedClients = useMemo(

        () =>

            [...clients].sort(

                (a, b) =>

                    a.client_id.localeCompare(

                        b.client_id,

                    ),

            ),

        [clients],

    );

    //------------------------------------------------------------------

    return (

        <Paper sx={{ p: 2 }}>

            <Box
                display="flex"
                alignItems="center"
                gap={1.5}
                mb={2}
            >
                <ListAltIcon
                    color="primary"
                    fontSize="small"
                />

                <Typography
                    sx={{
                        fontSize: 30,
                        fontWeight: 700,
                    }}
                >
                    Connected Clients
                </Typography>
            </Box>
            
            <Table size="small">

                <TableHead>

                    <TableRow>

                        <TableCell
                            sx={{
                                fontWeight: 700,
                                fontSize: 13,
                                letterSpacing: 0.6,
                                textTransform: "uppercase",
                                color: "text.secondary",
                                bgcolor: "grey.50",
                            }}
                        >
                            Client ID
                        </TableCell>

                        <TableCell
                            sx={{
                                fontWeight: 700,
                                fontSize: 13,
                                letterSpacing: 0.6,
                                textTransform: "uppercase",
                                color: "text.secondary",
                                bgcolor: "grey.50",
                            }}
                        >
                            Hostname
                        </TableCell>

                        <TableCell
                            sx={{
                                fontWeight: 700,
                                fontSize: 13,
                                letterSpacing: 0.6,
                                textTransform: "uppercase",
                                color: "text.secondary",
                                bgcolor: "grey.50",
                            }}
                        >
                            Organization
                        </TableCell>

                        <TableCell
                            sx={{
                                fontWeight: 700,
                                fontSize: 13,
                                letterSpacing: 0.6,
                                textTransform: "uppercase",
                                color: "text.secondary",
                                bgcolor: "grey.50",
                            }}
                        >
                            GPU
                        </TableCell>

                        <TableCell
                            sx={{
                                fontWeight: 700,
                                fontSize: 13,
                                letterSpacing: 0.6,
                                textTransform: "uppercase",
                                color: "text.secondary",
                                bgcolor: "grey.50",
                            }}
                        >
                            RAM (GB)
                        </TableCell>

                        <TableCell
                            sx={{
                                fontWeight: 700,
                                fontSize: 13,
                                letterSpacing: 0.6,
                                textTransform: "uppercase",
                                color: "text.secondary",
                                bgcolor: "grey.50",
                            }}
                        >
                            Status
                        </TableCell>

                        <TableCell
                            sx={{
                                fontWeight: 700,
                                fontSize: 13,
                                letterSpacing: 0.6,
                                textTransform: "uppercase",
                                color: "text.secondary",
                                bgcolor: "grey.50",
                            }}
                        >
                            Last Seen
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {sortedClients.length === 0 && (

                        <TableRow>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 13,
                                    letterSpacing: 0.6,
                                    textTransform: "uppercase",
                                    color: "text.secondary",
                                    bgcolor: "grey.50",
                                }}
                            >

                                No registered clients.

                            </TableCell>

                        </TableRow>

                    )}

                    {sortedClients.map(client => (

                        <TableRow
                            key={client.client_id}
                            hover
                        >

                            <TableCell>

                                {client.client_id}

                            </TableCell>

                            <TableCell>

                                {client.hostname}

                            </TableCell>

                            <TableCell>

                                {client.organization ?? "-"}

                            </TableCell>

                            <TableCell>

                                {client.gpu_name ?? "-"}

                            </TableCell>

                            <TableCell
                                align="center"
                            >

                                {client.ram_gb ?? "-"}

                            </TableCell>

                            <TableCell>

                                <Chip

                                    label={client.status}

                                    size="small"

                                    color={
                                        client.status === "ONLINE"
                                            ? "success"
                                            : client.status === "OFFLINE"
                                              ? "error"
                                              : "warning"
                                    }

                                />

                            </TableCell>

                            <TableCell>

                                {client.last_seen

                                    ? new Date(
                                          client.last_seen,
                                      ).toLocaleString()

                                    : "-"}

                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

            <Box mt={2}>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >

                    Client status is updated automatically through the runtime WebSocket.

                </Typography>

            </Box>

        </Paper>

    );

}