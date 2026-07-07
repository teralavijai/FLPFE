import { useQuery } from "@tanstack/react-query";

import lookupApi from "../api/lookupApi";

export function useModels() {

    return useQuery({

        queryKey: ["lookup-models"],

        queryFn: lookupApi.listModels,

        staleTime: 5 * 60 * 1000,

    });

}