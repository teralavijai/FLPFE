import { ReactNode } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "../lib/react-query";

import { RuntimeProvider } from "../context/RuntimeContext";

import RuntimeRepository from "../repositories/runtime/RuntimeRepository";

import theme from "../theme";

interface Props {
    children: ReactNode;
}

export default function AppProviders({
    children,
}: Props) {

    return (

        <QueryClientProvider client={queryClient}>

            <ThemeProvider theme={theme}>

                <CssBaseline />

                <RuntimeProvider>

                    {children}

                </RuntimeProvider>

            </ThemeProvider>

        </QueryClientProvider>

    );

}

async function initializeTrainingJob(
    jobId: number,
    forceRefresh?: boolean,
) {

    const rounds =
        await RuntimeRepository.getTrainingRounds(jobId);

    rounds.forEach(round =>
        upsertTrainingRound(dispatch, round),
    );

    const metrics =
        await RuntimeRepository.getClientMetrics(jobId);

    metrics.forEach(metric =>
        upsertClientMetric(dispatch, metric),
    );

    const events =
        await RuntimeRepository.getTrainingEvents(jobId);

    events.forEach(event =>
        appendTrainingEvent(dispatch, event),
    );

}

async function initializeClients(
        forceRefresh?: boolean,
) {

    const clients =
        await RuntimeRepository.getClients();

    clients.forEach(client =>
        upsertClient(dispatch, client),
    );

}