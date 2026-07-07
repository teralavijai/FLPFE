import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import trainingJobsApi from "../api/trainingJobsApi";
import {
    CreateTrainingJobRequest,
} from "../types/trainingJob";

export function useCreateTrainingJob() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            request: CreateTrainingJobRequest
        ) => trainingJobsApi.create(request),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["training-jobs"],
            });
        },
    });
}