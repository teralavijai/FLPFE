import { useQuery } from "@tanstack/react-query";

import mlModelsApi from "../api/mlModelsApi";

export function useMLModel(id: number) {

    return useQuery({

        queryKey: ["ml-model", id],

        queryFn: () => mlModelsApi.get(id),

        enabled: !!id,

    });

}