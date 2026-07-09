/*
 * Generic Lookup Option
 */

export interface LookupOption {
    label: string;
    value: string;
}

/*
 * Existing Model Lookup
 * Used by Training Jobs
 */

export interface ModelLookup {
    id: number;
    name: string;
}

/*
 * Generic Lookups Response
 */

export interface LookupsResponse {
    frameworks: LookupOption[];
    task_types: LookupOption[];
}

/*
 * Generic API wrappers
 */

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    total?: number;
    data: T;
}