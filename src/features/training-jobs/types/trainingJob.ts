export type TrainingJobStatus =
    | "CREATED"
    | "STARTING"
    | "RUNNING"
    | "COMPLETED"
    | "FAILED"
    | "STOPPED"
    | "CANCELLED";

export interface ApiDeleteResponse {
    success: boolean;
    message: string;
}

export interface TrainingJob {
    id: number;
    public_id: string;

    name: string;
    description?: string | null;

    model_id?: number | null;

    strategy: string;
    dataset_name?: string | null;

    status: TrainingJobStatus;

    total_rounds: number;
    current_round: number;

    local_epochs?: number;
    batch_size?: number;
    learning_rate?: number;

    fraction_fit?: number;
    fraction_evaluate?: number;

    min_fit_clients: number;
    min_evaluate_clients?: number;
    min_available_clients: number;

    best_accuracy?: number | null;
    best_loss?: number | null;

    runtime_pid?: number | null;
    runtime_port?: number | null;

    failure_reason?: string | null;

    checkpoint_path?: string | null;
    best_model_path?: string | null;

    runtime_config?: Record<string, unknown>;
    hyperparameters?: Record<string, unknown>;

    started_at?: string | null;
    completed_at?: string | null;
    cancelled_at?: string | null;

    created_at: string;
    updated_at?: string;
}

export interface CreateTrainingJobRequest {
    name: string;
    description?: string;

    model_id: number;

    strategy: string;

    dataset_name?: string;

    total_rounds: number;

    local_epochs: number;

    batch_size: number;

    learning_rate: number;

    fraction_fit: number;

    fraction_evaluate: number;

    min_fit_clients: number;

    min_evaluate_clients: number;

    min_available_clients: number;
}

export interface UpdateTrainingJobRequest
    extends CreateTrainingJobRequest {
    runtime_config?: Record<string, unknown>;
    hyperparameters?: Record<string, unknown>;
}

export interface StartTrainingJobResponse {
    message: string;
    job_id: number;
    pid: number;
    port: number;
    started_at: string;
}

export interface StopTrainingJobResponse {
    success: boolean;

    message: string;

    data: {
        job_id: number;
        completed_at: string;
    };
}

export interface TrainingJobStatusResponse {
    success: boolean;

    data: {
        job_id: number;
        status: TrainingJobStatus;
        runtime: unknown;
    };
}