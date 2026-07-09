import { Route, Routes } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardPage from "../features/dashboard/pages/DashboardPage";

import PlaceholderPage from "../features/common/pages/PlaceholderPage";

import { TrainingJobsPage } from "../features/training-jobs";

import CreateTrainingJobPage from "../features/training-jobs/pages/CreateTrainingJobPage";
import EditTrainingJobPage from "../features/training-jobs/pages/EditTrainingJobPage";
import TrainingJobDetailsPage from "../features/training-jobs/pages/TrainingJobDetailsPage";

import MLModelsPage from "../features/ml-models/pages/MLModelsPage";
import CreateMLModelPage from "../features/ml-models/pages/CreateMLModelPage";
import EditMLModelPage from "../features/ml-models/pages/EditMLModelPage";
import MLModelDetailsPage from "../features/ml-models/pages/MLModelDetailsPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>

                <Route
                    index
                    element={<DashboardPage />}
                />

                <Route
                    path="federated-learning"
                    element={
                        <PlaceholderPage title="Federated Learning" />
                    }
                />

                <Route
                    path="training-jobs"
                    element={<TrainingJobsPage />}
                />

                <Route
                    path="training-jobs/new"
                    element={<CreateTrainingJobPage />}
                />

                <Route
                    path="training-jobs/:id"
                    element={<TrainingJobDetailsPage />}
                />

                <Route
                    path="training-jobs/:id/edit"
                    element={<EditTrainingJobPage />}
                />

                <Route
                    path="ml-models"
                    element={<MLModelsPage />}
                />

                <Route
                    path="ml-models/new"
                    element={<CreateMLModelPage />}
                />

                <Route
                    path="ml-models/:id"
                    element={<MLModelDetailsPage />}
                />

                <Route
                    path="ml-models/:id/edit"
                    element={<EditMLModelPage />}
                />

                <Route
                    path="runtime"
                    element={
                        <PlaceholderPage title="Runtime Monitoring" />
                    }
                />

                <Route
                    path="agents"
                    element={<PlaceholderPage title="Agents" />}
                />

                <Route
                    path="datasets"
                    element={<PlaceholderPage title="Datasets" />}
                />

                <Route
                    path="users"
                    element={<PlaceholderPage title="Users" />}
                />

                <Route
                    path="settings"
                    element={<PlaceholderPage title="Settings" />}
                />

            </Route>
        </Routes>
    );
}