import { useMemo, useCallback } from "react";

import { useRuntimeContext } from "../context/RuntimeContext";

export function useRuntime() {

    const {

        state,

        initializeTrainingJob,

        initializeClients,

    } = useRuntimeContext();

    //------------------------------------------------------------------
    // Clients
    //------------------------------------------------------------------

    const clients = useMemo(

        () => Object.values(state.clients),

        [state.clients],

    );

    const connectedClients = useMemo(

        () =>

            clients.filter(

                client => client.status === "ONLINE",

            ),

        [clients],

    );

    //------------------------------------------------------------------
    // Lookup Helpers
    //------------------------------------------------------------------

    const getRounds = useCallback(

        (jobId: number) =>

            Object.values(

                state.trainingRounds[jobId] ?? {},

            ).sort(

                (a, b) =>

                    a.round_number - b.round_number,

            ),

        [state.trainingRounds],

    );

    const getClientMetrics = useCallback(

        (jobId: number) =>

            Object.values(

                state.clientMetrics[jobId] ?? {},

            ).sort((a, b) => {

                if (

                    a.round_number !==

                    b.round_number

                ) {

                    return (

                        a.round_number -

                        b.round_number

                    );

                }

                return a.client_id.localeCompare(

                    b.client_id,

                );

            }),

        [state.clientMetrics],

    );

    const getTrainingEvents = useCallback(

        (jobId: number) =>

            state.trainingEvents[jobId] ?? [],

        [state.trainingEvents],

    );

    //------------------------------------------------------------------

    return {

        connected: state.connected,

        runtimeStatus: state.runtimeStatus,

        clients,

        connectedClients,

        getRounds,

        getClientMetrics,

        getTrainingEvents,

        initializeTrainingJob,

        initializeClients,

    };

}