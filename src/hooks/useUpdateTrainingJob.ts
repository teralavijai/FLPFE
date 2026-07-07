import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import trainingJobsApi from "../api/trainingJobsApi";
import {
    UpdateTrainingJobRequest,
} from "../types/trainingJob";

interface Request {
    id: number;
    data: UpdateTrainingJobRequest;
}

export function useUpdateTrainingJob() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: Request) =>
            trainingJobsApi.update(
                request.id,
                request.data
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["training-jobs"],
            });
        },
    });
}