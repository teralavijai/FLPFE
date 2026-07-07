import { Route, Routes } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardPage from "../features/dashboard/pages/DashboardPage";

import PlaceholderPage from "../features/common/pages/PlaceholderPage";

import { TrainingJobsPage } from "../features/training-jobs";

import CreateTrainingJobPage from "../features/training-jobs/pages/CreateTrainingJobPage";
import EditTrainingJobPage from "../features/training-jobs/pages/EditTrainingJobPage";
import TrainingJobDetailsPage from "../features/training-jobs/pages/TrainingJobDetailsPage";

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
                    element={<PlaceholderPage title="ML Models" />}
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