import { useQuery } from "@tanstack/react-query";

import lookupApi from "../api/lookupApi";

export function useLookups() {

    return useQuery({

        queryKey: ["lookups"],

        queryFn: lookupApi.getLookups,

        staleTime: 30 * 60 * 1000,

    });

}