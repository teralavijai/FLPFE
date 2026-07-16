import { useEffect, useMemo } from "react";

import { useRuntime } from "../../../hooks/useRuntime";

export function useTrainingJobRuntime(
    jobId: number,
) {

    const {

        initializeTrainingJob,

        getRounds,

        getClientMetrics,

        getTrainingEvents,

    } = useRuntime();

    //------------------------------------------------------------------
    // Load Runtime Data
    //------------------------------------------------------------------

    useEffect(() => {

        if (!jobId) {

            return;

        }

        initializeTrainingJob(jobId);

    }, [

        jobId,

        initializeTrainingJob,

    ]);

    //------------------------------------------------------------------
    // Runtime Data
    //------------------------------------------------------------------

    const rounds = useMemo(

        () => getRounds(jobId),

        [

            jobId,

            getRounds,

        ],

    );

    const clientMetrics = useMemo(

        () => getClientMetrics(jobId),

        [

            jobId,

            getClientMetrics,

        ],

    );

    const trainingEvents = useMemo(

        () => getTrainingEvents(jobId),

        [

            jobId,

            getTrainingEvents,

        ],

    );

    //------------------------------------------------------------------
    // Latest Round
    //------------------------------------------------------------------

    const latestRound = useMemo(() => {

        return rounds.length > 0

            ? rounds[rounds.length - 1]

            : undefined;

    }, [rounds]);

    //------------------------------------------------------------------
    // Best Accuracy
    //------------------------------------------------------------------

    const bestAccuracy = useMemo(() => {

        if (rounds.length === 0) {

            return 0;

        }

        return Math.max(

            ...rounds.map(

                round => round.global_accuracy,

            ),

        );

    }, [rounds]);

    //------------------------------------------------------------------
    // Latest Loss
    //------------------------------------------------------------------

    const latestLoss = latestRound?.global_loss ?? 0;

    //------------------------------------------------------------------
    // Average Training Time
    //------------------------------------------------------------------

    const averageTrainingTime = useMemo(() => {

        if (clientMetrics.length === 0) {

            return 0;

        }

        return (

            clientMetrics.reduce(

                (sum, metric) =>

                    sum + metric.training_time,

                0,

            )

            /

            clientMetrics.length

        );

    }, [clientMetrics]);

    //------------------------------------------------------------------
    // Participating Clients
    //------------------------------------------------------------------

    const participatingClients = useMemo(() => {

        return Array.from(

            new Set(

                clientMetrics.map(

                    metric => metric.client_id,

                ),

            ),

        ).sort();

    }, [clientMetrics]);

    //------------------------------------------------------------------
    // Metrics By Round
    //------------------------------------------------------------------

    const metricsByRound = useMemo(() => {

        const grouped = new Map<
            number,
            typeof clientMetrics
        >();

        clientMetrics.forEach(metric => {

            const metrics =

                grouped.get(

                    metric.round_number,

                ) ?? [];

            metrics.push(metric);

            grouped.set(

                metric.round_number,

                metrics,

            );

        });

        return grouped;

    }, [clientMetrics]);

    //------------------------------------------------------------------
    // Progress
    //------------------------------------------------------------------

    const progress = latestRound?.round_number ?? 0;

    //------------------------------------------------------------------

    return {

        rounds,

        latestRound,

        clientMetrics,

        metricsByRound,

        trainingEvents,

        bestAccuracy,

        latestLoss,

        averageTrainingTime,

        participatingClients,

        progress,

    };

}