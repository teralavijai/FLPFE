// ===============================================
// Runtime WebSocket Types
// ===============================================

export type RuntimeEventType =
    | "training_round"
    | "training_event"
    | "client_metric"
    | "client"
    | "runtime_status";

// ===============================================

export interface RuntimeEnvelope<T = unknown> {

    version: number;

    type: RuntimeEventType;

    timestamp: string;

    payload: T;

}

// ===============================================
// Training Round
// ===============================================

export interface TrainingRoundPayload {

    job_id: number;

    round_number: number;

    global_accuracy: number;

    global_loss: number;

    started_at: string;

    completed_at: string;

}

// ===============================================
// Client Metric
// ===============================================

export interface ClientMetricPayload {

    job_id: number;

    round_number: number;

    client_id: string;

    num_examples: number;

    before_accuracy: number;

    after_accuracy: number;

    loss: number;

    training_time: number;

}

// ===============================================
// Training Event
// ===============================================

export interface TrainingEventPayload {

    job_id: number;

    round_number?: number;

    client_id?: string;

    event_type: string;

    event_level: string;

    message: string;

    created_at?: string;

}

// ===============================================
// Client
// ===============================================

export interface ClientPayload {

    client_id: string;

    hostname: string;

    ip_address: string;

    organization?: string;

    gpu_name?: string;

    gpu_memory?: number;

    cpu?: string;

    ram_gb?: number;

    os_name?: string;

    flower_version?: string;

    status: string;

    last_seen?: string;

}

// ===============================================
// Runtime Status
// ===============================================

export interface RuntimeStatusPayload {

    server_running: boolean;

    active_jobs: number;

    connected_clients: number;

}

// ===============================================
// Runtime State
// ===============================================

export interface RuntimeState {

    connected: boolean;

    trainingRounds:
        Record<
            number,
            Record<number, TrainingRoundPayload>
        >;
    // job_id -> round_number -> TrainingRound

    clientMetrics:
        Record<
            number,
            Record<string, ClientMetricPayload>
        >;
    // job_id -> "round-client" -> ClientMetric

    trainingEvents:
        Record<
            number,
            TrainingEventPayload[]
        >;
    // job_id -> events

    clients:
        Record<
            string,
            ClientPayload
        >;

    runtimeStatus?: RuntimeStatusPayload;

}

// ===============================================
// Runtime Actions
// ===============================================

export type RuntimeAction =
    | {
          type: "CONNECTED";
      }
    | {
          type: "DISCONNECTED";
      }
    | {
          type: "TRAINING_ROUND";
          payload: TrainingRoundPayload;
      }
    | {
          type: "CLIENT_METRIC";
          payload: ClientMetricPayload;
      }
    | {
          type: "TRAINING_EVENT";
          payload: TrainingEventPayload;
      }
    | {
          type: "CLIENT";
          payload: ClientPayload;
      }
    | {
          type: "RUNTIME_STATUS";
          payload: RuntimeStatusPayload;
      };

// ===============================================

export const initialRuntimeState: RuntimeState = {

    connected: false,

    trainingRounds: {},

    clientMetrics: {},

    trainingEvents: {},

    clients: {},

    runtimeStatus: undefined,

};