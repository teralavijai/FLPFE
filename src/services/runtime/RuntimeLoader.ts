// src/services/runtime/RuntimeLoader.ts

import type {
    RuntimeEnvelope,
    RuntimeAction,
    TrainingRoundPayload,
    ClientMetricPayload,
    TrainingEventPayload,
    ClientPayload,
    RuntimeStatusPayload,
    TrainingJobStatusPayload,
} from "../../types/runtime";

import { queryClient } from "../../lib/react-query";

import type { TrainingJob } from "../../features/training-jobs/types/trainingJob";
export interface RuntimeLoaderOptions {

    url: string;

    dispatch: React.Dispatch<RuntimeAction>;

    onOpen?: () => void;

    onClose?: () => void;

    onError?: (event: Event) => void;

}

export default class RuntimeLoader {

    private socket: WebSocket | null = null;

    private reconnectTimer: number | null = null;

    private manuallyClosed = false;

    private readonly url: string;

    private readonly dispatch: React.Dispatch<RuntimeAction>;

    private readonly onOpen?: () => void;

    private readonly onClose?: () => void;

    private readonly onError?: (event: Event) => void;

    constructor(options: RuntimeLoaderOptions) {

        this.url = options.url;

        this.dispatch = options.dispatch;

        this.onOpen = options.onOpen;

        this.onClose = options.onClose;

        this.onError = options.onError;

    }

    private updateTrainingJobCache(payload: TrainingJobStatusPayload,): void {

        queryClient.setQueryData<TrainingJob[]>(
            ["training-jobs"],
            (oldJobs = []) =>

                oldJobs.map(job =>

                    job.id === payload.job_id

                        ? {

                            ...job,

                            status: payload.status,

                            current_round: payload.current_round,

                            total_rounds: payload.total_rounds,

                            started_at: payload.started_at,

                            completed_at: payload.completed_at,

                            best_accuracy: payload.best_accuracy,

                            best_loss: payload.best_loss,

                        }

                        : job,

                ),

        );

    }

    //------------------------------------------------------------------
    // Connect
    //------------------------------------------------------------------

    connect(): void {

        if (
            this.socket &&
            (
                this.socket.readyState === WebSocket.OPEN ||
                this.socket.readyState === WebSocket.CONNECTING
            )
        ) {

            return;

        }

        this.manuallyClosed = false;

        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {

            this.dispatch({

                type: "CONNECTED",

            });

            this.onOpen?.();

        };

        this.socket.onmessage = (event) => {

            this.handleMessage(event.data);

        };

        this.socket.onerror = (event) => {

            this.onError?.(event);

        };

        this.socket.onclose = () => {

            this.dispatch({

                type: "DISCONNECTED",

            });

            this.onClose?.();

            this.socket = null;

            if (!this.manuallyClosed) {

                this.scheduleReconnect();

            }

        };

    }

    //------------------------------------------------------------------
    // Disconnect
    //------------------------------------------------------------------

    disconnect(): void {

        this.manuallyClosed = true;

        if (this.reconnectTimer !== null) {

            window.clearTimeout(this.reconnectTimer);

            this.reconnectTimer = null;

        }

        this.socket?.close();

        this.socket = null;

    }

    //------------------------------------------------------------------
    // Reconnect
    //------------------------------------------------------------------

    private scheduleReconnect(): void {

        if (this.reconnectTimer !== null) {

            return;

        }

        this.reconnectTimer = window.setTimeout(() => {

            this.reconnectTimer = null;

            if (!this.manuallyClosed) {

                this.connect();

            }

        }, 5000);

    }

    //------------------------------------------------------------------
    // Handle Incoming Message
    //------------------------------------------------------------------

    private handleMessage(raw: string): void {

        let envelope: RuntimeEnvelope;

        try {

            envelope = JSON.parse(raw);

        }

        catch (error) {

            console.error(

                "Invalid runtime websocket message",

                error,

            );

            return;

        }

        switch (envelope.type) {

            //----------------------------------------------------------
            // Training Round
            //----------------------------------------------------------

            case "training_round":

                this.dispatch({

                    type: "TRAINING_ROUND",

                    payload:
                        envelope.payload as TrainingRoundPayload,

                });

                break;

            //----------------------------------------------------------
            // Client Metric
            //----------------------------------------------------------

            case "client_metric":

                this.dispatch({

                    type: "CLIENT_METRIC",

                    payload:
                        envelope.payload as ClientMetricPayload,

                });

                break;

            //----------------------------------------------------------
            // Training Event
            //----------------------------------------------------------

            case "training_event":

                this.dispatch({

                    type: "TRAINING_EVENT",

                    payload:
                        envelope.payload as TrainingEventPayload,

                });

                break;

            //----------------------------------------------------------
            // Client
            //----------------------------------------------------------

            case "client":

                this.dispatch({

                    type: "CLIENT",

                    payload:
                        envelope.payload as ClientPayload,

                });

                break;

            //----------------------------------------------------------
            // Runtime Status
            //----------------------------------------------------------

                        //----------------------------------------------------------
            // Training Job Status
            //----------------------------------------------------------

            case "training_job_status": {

                const payload =
                    envelope.payload as TrainingJobStatusPayload;

                //
                // Update React Query cache immediately so every page
                // using useTrainingJobs() refreshes instantly.
                //

                this.updateTrainingJobCache(payload);

                //
                // Also publish to RuntimeContext in case any runtime
                // component wants to react to job status changes.
                //

                this.dispatch({

                    type: "TRAINING_JOB_STATUS",

                    payload,

                });

                break;

            }

            //----------------------------------------------------------
            // Runtime Status
            //----------------------------------------------------------

            case "runtime_status":

                this.dispatch({

                    type: "RUNTIME_STATUS",

                    payload:
                        envelope.payload as RuntimeStatusPayload,

                });

                break;
                
            //----------------------------------------------------------
            // Unknown
            //----------------------------------------------------------

            default:

                console.warn(

                    "Unknown runtime event:",

                    envelope.type,

                );

        }

    }

}