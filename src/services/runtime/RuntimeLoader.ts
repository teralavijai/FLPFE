// src/services/runtime/RuntimeLoader.ts

import type {
    RuntimeEnvelope,
    RuntimeAction,
    TrainingRoundPayload,
    ClientMetricPayload,
    TrainingEventPayload,
    ClientPayload,
    RuntimeStatusPayload,
} from "../../types/runtime";

export interface RuntimeLoaderOptions {

    url: string;

    dispatch: React.Dispatch<RuntimeAction>;

    onOpen?: () => void;

    onClose?: () => void;

    onError?: (event: Event) => void;

    onTrainingCompleted?: () => void;

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

    private readonly onTrainingCompleted?: () => void;

    constructor(options: RuntimeLoaderOptions) {

        this.url = options.url;

        this.dispatch = options.dispatch;

        this.onOpen = options.onOpen;

        this.onClose = options.onClose;

        this.onError = options.onError;

        this.onTrainingCompleted = options.onTrainingCompleted;

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

        } catch (error) {

            console.error(
                "Invalid runtime websocket message",
                error,
            );

            return;

        }

        switch (envelope.type) {

            case "training_round":

                this.dispatch({

                    type: "TRAINING_ROUND",

                    payload:
                        envelope.payload as TrainingRoundPayload,

                });

                break;

            case "client_metric":

                this.dispatch({

                    type: "CLIENT_METRIC",

                    payload:
                        envelope.payload as ClientMetricPayload,

                });

                break;

            case "training_event":

                const trainingEvent =
                    envelope.payload as TrainingEventPayload;

                this.dispatch({

                    type: "TRAINING_EVENT",

                    payload: trainingEvent,

                });

                if (
                    trainingEvent.event_type === "TRAINING_COMPLETED" ||
                    trainingEvent.event_type === "TRAINING_FAILED" ||
                    trainingEvent.event_type === "TRAINING_STOPPED"
                ) {

                    this.onTrainingCompleted?.();

                }

                break;

            case "client":

                this.dispatch({

                    type: "CLIENT",

                    payload:
                        envelope.payload as ClientPayload,

                });

                break;

            case "runtime_status":

                this.dispatch({

                    type: "RUNTIME_STATUS",

                    payload:
                        envelope.payload as RuntimeStatusPayload,

                });

                break;

            default:

                console.warn(
                    "Unknown runtime event:",
                    envelope.type,
                );

        }

    }

}