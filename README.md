# Federated Learning Platform - Frontend

A modern React-based Operations Console for managing enterprise Federated Learning deployments.

---

## Overview

The Federated Learning Platform Frontend provides a unified web interface for orchestrating, monitoring, and managing distributed machine learning across multiple organizations, hospitals, laboratories, and research centers.

It enables administrators and ML engineers to:

* Register machine learning models
* Create and manage federated learning jobs
* Monitor training progress in real time
* Manage organizations, users, and agents
* View system health and runtime statistics
* Control the complete lifecycle of federated learning workloads

The frontend communicates exclusively with the FastAPI backend through REST APIs.

---

# Key Features

## Dashboard

* Platform overview
* Running training jobs
* Registered ML models
* Connected agents
* Recent activity
* Training statistics

---

## Model Registry

* Register ML models
* Version management
* Framework information
* Model metadata
* Search and filtering

---

## Training Jobs

* Create training jobs
* Configure Flower strategies
* Configure federated learning parameters
* Start/Stop training
* Monitor job status
* View training history

---

## Agent Management

* Registered agents
* Online/Offline status
* Organization mapping
* Runtime health
* Last heartbeat

---

## Organizations

* Organization management
* Hospital/Lab registration
* Organization administrators
* Multi-tenant ready architecture

---

## Monitoring

* Runtime monitoring
* Live training status
* Server health
* Agent activity
* Future support for charts and metrics

---

## Planned Features

* Authentication
* Role Based Access Control (RBAC)
* Dark Mode
* Notifications
* Live Logs
* TensorBoard Integration
* Training Charts
* Model Comparison
* WebSocket-based live monitoring

---

# Technology Stack

| Technology        | Purpose           |
| ----------------- | ----------------- |
| React             | UI Framework      |
| Vite              | Build Tool        |
| Material UI (MUI) | User Interface    |
| React Router      | Routing           |
| Axios             | REST API Client   |
| React Hook Form   | Forms             |
| Notistack         | Notifications     |
| MUI DataGrid      | Enterprise Tables |

---

# Project Structure

```text
frontend/
│
├── public/
│
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   └── layout/
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── modules/
│   │   ├── dashboard/
│   │   ├── ml_models/
│   │   ├── training_jobs/
│   │   ├── agents/
│   │   ├── organizations/
│   │   ├── monitoring/
│   │   └── settings/
│   ├── routes/
│   ├── theme/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.development
├── .env.production
├── package.json
├── vite.config.js
└── README.md
```

---

# Environment Configuration

## `.env.development`

```properties
VITE_APP_NAME=Federated Learning Platform
VITE_API_BASE_URL=http://localhost:8090
VITE_REFRESH_INTERVAL=5000
```

---

## `.env.production`

```properties
VITE_APP_NAME=Federated Learning Platform
VITE_API_BASE_URL=https://your-domain/api
VITE_REFRESH_INTERVAL=5000
```

---

# Installation

Clone the repository.

```bash
git clone <frontend-repository-url>
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

# Backend Integration

The frontend consumes REST APIs exposed by the Federated Learning Platform Backend.

Primary modules include:

* ML Models
* Training Jobs
* Agents
* Organizations
* Monitoring
* Authentication (planned)

All API communication is centralized through a single Axios instance to provide:

* Environment-based configuration
* Request interceptors
* Future JWT authentication
* Global error handling
* Automatic notifications

---

# User Interface

The application follows a modern enterprise operations console design inspired by cloud platforms and ML operations tools.

Navigation modules include:

* Dashboard
* Training Jobs
* Model Registry
* Agents
* Organizations
* Monitoring
* Settings

The interface is responsive and optimized for both desktop and large-screen operational environments.

---

# Development Principles

The project follows:

* Feature-based architecture
* Reusable component design
* Separation of concerns
* Environment-driven configuration
* Enterprise UI patterns
* Responsive layouts
* Clean and maintainable code

---

# Development Roadmap

## Phase 1 (MVP)

* Application shell
* Dashboard
* Model Registry
* Training Jobs
* Backend integration

## Phase 2

* Agent Management
* Organization Management
* Live monitoring
* Status updates
* Notifications

## Phase 3

* Authentication
* Role Based Access Control
* Charts and analytics
* Live logs
* Dark mode
* User preferences

## Phase 4

* Multi-tenancy
* Kubernetes integration
* Advanced monitoring
* Production deployment
* Plugin architecture

---

# Related Projects

* **Backend** – FastAPI orchestration engine
* **Agent** – Remote federated learning agent
* **Flower** – Distributed federated learning framework

Together, these components form a complete enterprise Federated Learning Platform capable of orchestrating secure, distributed machine learning across multiple participating organizations.

---

# License

This project is licensed under the MIT License.
# Federated Learning Platform - Frontend

A modern React-based Operations Console for managing enterprise Federated Learning deployments.

---

## Overview

The Federated Learning Platform Frontend provides a unified web interface for orchestrating, monitoring, and managing distributed machine learning across multiple organizations, hospitals, laboratories, and research centers.

It enables administrators and ML engineers to:

* Register machine learning models
* Create and manage federated learning jobs
* Monitor training progress in real time
* Manage organizations, users, and agents
* View system health and runtime statistics
* Control the complete lifecycle of federated learning workloads

The frontend communicates exclusively with the FastAPI backend through REST APIs.

---

# Key Features

## Dashboard

* Platform overview
* Running training jobs
* Registered ML models
* Connected agents
* Recent activity
* Training statistics

---

## Model Registry

* Register ML models
* Version management
* Framework information
* Model metadata
* Search and filtering

---

## Training Jobs

* Create training jobs
* Configure Flower strategies
* Configure federated learning parameters
* Start/Stop training
* Monitor job status
* View training history

---

## Agent Management

* Registered agents
* Online/Offline status
* Organization mapping
* Runtime health
* Last heartbeat

---

## Organizations

* Organization management
* Hospital/Lab registration
* Organization administrators
* Multi-tenant ready architecture

---

## Monitoring

* Runtime monitoring
* Live training status
* Server health
* Agent activity
* Future support for charts and metrics

---

## Planned Features

* Authentication
* Role Based Access Control (RBAC)
* Dark Mode
* Notifications
* Live Logs
* TensorBoard Integration
* Training Charts
* Model Comparison
* WebSocket-based live monitoring

---

# Technology Stack

| Technology        | Purpose           |
| ----------------- | ----------------- |
| React             | UI Framework      |
| Vite              | Build Tool        |
| Material UI (MUI) | User Interface    |
| React Router      | Routing           |
| Axios             | REST API Client   |
| React Hook Form   | Forms             |
| Notistack         | Notifications     |
| MUI DataGrid      | Enterprise Tables |

---

# Project Structure

```text
frontend/
│
├── public/
│
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   └── layout/
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── modules/
│   │   ├── dashboard/
│   │   ├── ml_models/
│   │   ├── training_jobs/
│   │   ├── agents/
│   │   ├── organizations/
│   │   ├── monitoring/
│   │   └── settings/
│   ├── routes/
│   ├── theme/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.development
├── .env.production
├── package.json
├── vite.config.js
└── README.md
```

---

# Environment Configuration

## `.env.development`

```properties
VITE_APP_NAME=Federated Learning Platform
VITE_API_BASE_URL=http://localhost:8090
VITE_REFRESH_INTERVAL=5000
```

---

## `.env.production`

```properties
VITE_APP_NAME=Federated Learning Platform
VITE_API_BASE_URL=https://your-domain/api
VITE_REFRESH_INTERVAL=5000
```

---

# Installation

Clone the repository.

```bash
git clone <frontend-repository-url>
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

# Backend Integration

The frontend consumes REST APIs exposed by the Federated Learning Platform Backend.

Primary modules include:

* ML Models
* Training Jobs
* Agents
* Organizations
* Monitoring
* Authentication (planned)

All API communication is centralized through a single Axios instance to provide:

* Environment-based configuration
* Request interceptors
* Future JWT authentication
* Global error handling
* Automatic notifications

---

# User Interface

The application follows a modern enterprise operations console design inspired by cloud platforms and ML operations tools.

Navigation modules include:

* Dashboard
* Training Jobs
* Model Registry
* Agents
* Organizations
* Monitoring
* Settings

The interface is responsive and optimized for both desktop and large-screen operational environments.

---

# Development Principles

The project follows:

* Feature-based architecture
* Reusable component design
* Separation of concerns
* Environment-driven configuration
* Enterprise UI patterns
* Responsive layouts
* Clean and maintainable code

---

# Development Roadmap

## Phase 1 (MVP)

* Application shell
* Dashboard
* Model Registry
* Training Jobs
* Backend integration

## Phase 2

* Agent Management
* Organization Management
* Live monitoring
* Status updates
* Notifications

## Phase 3

* Authentication
* Role Based Access Control
* Charts and analytics
* Live logs
* Dark mode
* User preferences

## Phase 4

* Multi-tenancy
* Kubernetes integration
* Advanced monitoring
* Production deployment
* Plugin architecture

---

# Related Projects

* **Backend** – FastAPI orchestration engine
* **Agent** – Remote federated learning agent
* **Flower** – Distributed federated learning framework

Together, these components form a complete enterprise Federated Learning Platform capable of orchestrating secure, distributed machine learning across multiple participating organizations.

---

# License

This project is licensed under the MIT License.

