import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import trainingJobsApi from "../api/trainingJobsApi";

export function useDeleteTrainingJob() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            trainingJobsApi.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["training-jobs"],
            });
        },
    });
}