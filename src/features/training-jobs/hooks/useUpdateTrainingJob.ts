import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import trainingJobsApi from "../api/trainingJobsApi";

export function useUpdateTrainingJob() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            payload,
        }: {
            id: number;
            payload: any;
        }) =>
            trainingJobsApi.update(
                id,
                payload
            ),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["training-jobs"],
            });

        },

    });

}