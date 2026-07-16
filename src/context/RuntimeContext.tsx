import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    ReactNode,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import RuntimeRepository from "../repositories/runtime/RuntimeRepository";
import RuntimeLoader from "../services/runtime/RuntimeLoader";

import type {
    RuntimeAction,
    RuntimeState,
    TrainingRoundPayload,
    ClientMetricPayload,
    TrainingEventPayload,
    ClientPayload,
} from "../types/runtime";

import {
    initialRuntimeState,
} from "../types/runtime";

import { WS_API_URL } from "../config/api";
import { WS_RUNTIME_ENDPOINT } from "../config/constants";


// ======================================================================
// Reducer Helpers
// ======================================================================

function upsertTrainingRound(
    state: RuntimeState,
    round: TrainingRoundPayload,
): RuntimeState {

    const rounds =
        state.trainingRounds[round.job_id] ?? {};

    return {

        ...state,

        trainingRounds: {

            ...state.trainingRounds,

            [round.job_id]: {

                ...rounds,

                [round.round_number]: round,

            },

        },

    };

}

function upsertClientMetric(
    state: RuntimeState,
    metric: ClientMetricPayload,
): RuntimeState {

    const metrics =
        state.clientMetrics[metric.job_id] ?? {};

    const key =
        `${metric.round_number}-${metric.client_id}`;

    return {

        ...state,

        clientMetrics: {

            ...state.clientMetrics,

            [metric.job_id]: {

                ...metrics,

                [key]: metric,

            },

        },

    };

}

function appendTrainingEvent(
    state: RuntimeState,
    event: TrainingEventPayload,
): RuntimeState {

    const events =
        state.trainingEvents[event.job_id] ?? [];

    
    return {

        ...state,

        trainingEvents: {

            ...state.trainingEvents,

            [event.job_id]: [

                ...events,

                event,

            ].slice(-500),

        },

    };

}

function upsertClient(
    state: RuntimeState,
    client: ClientPayload,
): RuntimeState {

    return {

        ...state,

        clients: {

            ...state.clients,

            [client.client_id]: client,

        },

    };

}

// ======================================================================
// Reducer
// ======================================================================

function runtimeReducer(
    state: RuntimeState,
    action: RuntimeAction,
): RuntimeState {

    switch (action.type) {

        case "CONNECTED":

            return {

                ...state,

                connected: true,

            };

        case "DISCONNECTED":

            return {

                ...state,

                connected: false,

            };

        case "TRAINING_ROUND":

            return upsertTrainingRound(
                state,
                action.payload,
            );

        case "CLIENT_METRIC":

            return upsertClientMetric(
                state,
                action.payload,
            );

        case "TRAINING_EVENT":

            return appendTrainingEvent(
                state,
                action.payload,
            );

        case "CLIENT":

            return upsertClient(
                state,
                action.payload,
            );

        case "RUNTIME_STATUS":

            return {

                ...state,

                runtimeStatus:
                    action.payload,

            };

        default:

            return state;

    }

}

// ======================================================================
// Context
// ======================================================================

interface RuntimeContextType {

    state: RuntimeState;

    initializeTrainingJob(
        jobId: number,
        forceRefresh?: boolean,
    ): Promise<void>;

    initializeClients(
        forceRefresh?: boolean,
    ): Promise<void>;

}

const RuntimeContext =
    createContext<
        RuntimeContextType | undefined
    >(undefined);

// ======================================================================

interface Props {

    children: ReactNode;

}

// ======================================================================

export function RuntimeProvider({

    children,

}: Props) {

    const [state, dispatch] =
        useReducer(
            runtimeReducer,
            initialRuntimeState,
        );

    const queryClient = useQueryClient();

    //------------------------------------------------------------------
    // Cache
    //------------------------------------------------------------------

    const initializedJobs =
        useRef(
            new Map<number, Date>(),
        );

    const clientsInitialized =
        useRef(false);

    //------------------------------------------------------------------
    // Runtime Loader
    //------------------------------------------------------------------

    const loader =
        useRef<RuntimeLoader>();

    //------------------------------------------------------------------
    // Initialize Job
    //------------------------------------------------------------------

    const initializeTrainingJob =
        useCallback(

            async (
                jobId: number,
                forceRefresh = false,
            ) => {

                if (
                    initializedJobs.current.has(jobId) &&
                    !forceRefresh
                ) {

                    return;

                }

                const rounds =
                    await RuntimeRepository.getTrainingRounds(
                        jobId,
                    );

                rounds.forEach(round => {

                    dispatch({

                        type: "TRAINING_ROUND",

                        payload: round,

                    });

                });

                const metrics =
                    await RuntimeRepository.getClientMetrics(
                        jobId,
                    );

                metrics.forEach(metric => {

                    dispatch({

                        type: "CLIENT_METRIC",

                        payload: metric,

                    });

                });

                const events =
                    await RuntimeRepository.getTrainingEvents(
                        jobId,
                    );

                events.forEach(event => {

                    dispatch({

                        type: "TRAINING_EVENT",

                        payload: event,

                    });

                });

                initializedJobs.current.set(
                    jobId,
                    new Date(),
                );

            },

            [],

        );

    //------------------------------------------------------------------
    // Initialize Clients
    //------------------------------------------------------------------

    const initializeClients =
        useCallback(

            async (
                forceRefresh = false,
            ) => {

                if (
                    clientsInitialized.current &&
                    !forceRefresh
                ) {

                    return;

                }

                const clients =
                    await RuntimeRepository.getClients();

                clients.forEach(client => {

                    dispatch({

                        type: "CLIENT",

                        payload: client,

                    });

                });

                clientsInitialized.current = true;

            },

            [],

        );
        
    //------------------------------------------------------------------
    // WebSocket Lifecycle
    //------------------------------------------------------------------

    useEffect(() => {

        loader.current = new RuntimeLoader({

            url: `${WS_API_URL}${WS_RUNTIME_ENDPOINT}`,

            dispatch,

            onTrainingCompleted: () => {

                queryClient.invalidateQueries({
                    queryKey: ["training-jobs"],
                });

            },

        });

        loader.current.connect();

        return () => {

            loader.current?.disconnect();

        };

    }, [queryClient]);

    useEffect(() => {

        const allEvents = Object.values(state.trainingEvents)
            .flat();

        if (allEvents.length === 0) {
            return;
        }

        const latest = allEvents[allEvents.length - 1];

        if (
            latest.event_type === "TRAINING_COMPLETED" ||
            latest.event_type === "TRAINING_FAILED" ||
            latest.event_type === "SERVER_STOPPED"
        ) {

            queryClient.invalidateQueries({
                queryKey: ["training-jobs"],
            });

        }

    }, [
        state.trainingEvents,
        queryClient,
    ]);

    //------------------------------------------------------------------
    // Context Value
    //------------------------------------------------------------------

    const value = useMemo(

        () => ({

            state,

            initializeTrainingJob,

            initializeClients,

        }),

        [

            state,

            initializeTrainingJob,

            initializeClients,

        ],

    );

    //------------------------------------------------------------------

    return (

        <RuntimeContext.Provider value={value}>

            {children}

        </RuntimeContext.Provider>

    );

}

// ======================================================================
// Hook
// ======================================================================

export function useRuntimeContext(): RuntimeContextType {

    const context = useContext(

        RuntimeContext,

    );

    if (!context) {

        throw new Error(

            "useRuntimeContext must be used within RuntimeProvider",

        );

    }

    return context;

}