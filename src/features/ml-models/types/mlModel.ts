/*
 * Common API response wrappers
 */

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ApiListResponse<T> {
    success: boolean;
    message: string;
    total: number;
    data: T[];
}

export interface ApiMessageResponse {
    success: boolean;
    message: string;
}

/*
 * ML Model
 */

export interface MLModel {

    id: number;

    public_id: string;

    name: string;

    version: string;

    description?: string | null;

    framework: string;

    architecture?: string | null;

    task_type: string;

    weights_path?: string | null;

    config_path?: string | null;

    is_pretrained: boolean;

    is_public: boolean;

    is_active: boolean;

    created_at?: string;

    updated_at?: string;

}

/*
 * Create
 */

export interface CreateMLModelRequest {

    name: string;

    version: string;

    description?: string;

    framework: string;

    architecture?: string;

    task_type: string;

    weights_path?: string;

    config_path?: string;

    is_pretrained: boolean;

    is_public: boolean;

}

/*
 * Update
 *
 * Backend accepts partial updates.
 */

export type UpdateMLModelRequest =
    Partial<CreateMLModelRequest>;

/*
 * Lookup Option
 */

export interface LookupOption {

    label: string;

    value: string;

}