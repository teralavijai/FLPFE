import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import mlModelsApi from "../api/mlModelsApi";

export function useDeleteMLModel() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: mlModelsApi.delete,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["ml-models"],

            });

        },

    });

}