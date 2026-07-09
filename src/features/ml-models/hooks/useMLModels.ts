import { useQuery } from "@tanstack/react-query";

import mlModelsApi from "../api/mlModelsApi";

export function useMLModels() {

    return useQuery({

        queryKey: ["ml-models"],

        queryFn: mlModelsApi.list,

        staleTime: 5 * 60 * 1000,

    });

}