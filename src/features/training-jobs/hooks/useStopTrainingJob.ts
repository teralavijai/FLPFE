import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import trainingJobsApi from "../api/trainingJobsApi";

export function useStopTrainingJob() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: trainingJobsApi.stop,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["training-jobs"],
            });

        },

    });

}