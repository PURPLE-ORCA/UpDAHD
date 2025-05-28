# Developer Documentation for UpDAHD

This document provides an in-depth guide for developers looking to understand, modify, and contribute to the UpDAHD Employee Management System.

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
  - [Frontend](#frontend)
  - [Backend (Supabase)](#backend-supabase)
  - [Data Flow](#data-flow)
- [Development Setup](#development-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Environment Variables](#environment-variables)
- [Codebase Structure](#codebase-structure)
  - [`src/components/`](#srccomponents)
  - [`src/context/`](#srccontext)
  - [`src/lib/`](#srclib)
  - [`src/supabaseClient.js`](#srcsupabaseclientjs)
- [Styling](#styling)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Contributing Guidelines](#contributing-guidelines)
  - [Branching Strategy](#branching-strategy)
  - [Commit Messages](#commit-messages)
  - [Pull Requests](#pull-requests)
  - [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Project Overview

UpDAHD is a React-based single-page application (SPA) that interacts with a Supabase backend for authentication and data persistence. It aims to provide a robust and user-friendly platform for managing employee records.

## Architecture

### Frontend

The frontend is built with React.js and Vite, utilizing Tailwind CSS for styling and Shadcn UI for pre-built, accessible components. State management is primarily handled using React Context API for global states like authentication and theming.

### Backend (Supabase)

Supabase provides the backend services, including:

- **Authentication**: Handles user registration, login, and session management.
- **PostgreSQL Database**: Stores all employee and user profile data.
- **Row Level Security (RLS)**: Ensures data security by defining policies for data access.

### Data Flow

```mermaid
graph TD
    User[User Interface (React)] -->|API Calls| Supabase[Supabase Backend]
    Supabase -->|Authentication| AuthDB[Auth Database]
    Supabase -->|Data Operations| PostgreSQL[PostgreSQL Database]
    PostgreSQL -->|RLS| Supabase
    AuthDB --> Supabase
```

1.  User interacts with the React frontend.
2.  Frontend makes API calls to Supabase (e.g., `supabase.auth.signIn`, `supabase.from('employees').select('*')`).
3.  Supabase handles authentication requests against its internal authentication database.
4.  For data operations, Supabase interacts with the PostgreSQL database, enforcing Row Level Security policies.
5.  Data is returned to the frontend for display.

## Development Setup

### Prerequisites

- Node.js (v18+)
- npm
- Git
- Supabase Account and Project (with configured tables and RLS)

### Installation

Refer to the [Installation Guide](installation_guide.md) for detailed steps.

### Running the Application

```bash
npm run dev
```

This command starts the Vite development server.

### Environment Variables

Create a `.env.local` file in the project root with your Supabase credentials:

```
VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

## Codebase Structure

### `src/components/`

Contains all reusable React components.

- `src/components/ui/`: Houses Shadcn UI components, which are often generated and customized.
- Other components like `EmployeeList.jsx`, `AddEmployeeModal.jsx`, `Header.jsx`, `Sidebar.jsx`, etc., encapsulate specific UI functionalities.

### `src/context/`

Manages global application state using React Context.

- `AuthContext.jsx`: Provides authentication state and functions (`signIn`, `signUp`, `signOut`, `user` object).
- `ThemeContext.jsx`: Manages the application's theme (light/dark mode).

### `src/lib/`

Contains utility functions and helper modules.

- `utils.js`: General utility functions (e.g., `cn` for Tailwind class merging).

### `src/supabaseClient.js`

Initializes and exports the Supabase client instance, configured with environment variables. This is the central point for all Supabase interactions.

## Styling

UpDAHD uses **Tailwind CSS** for utility-first styling and **Shadcn UI** for pre-built, customizable components.

- `tailwind.config.js`: Configures Tailwind CSS, including theme extensions and custom utilities.
- `src/App.css`: Contains base styles and any custom CSS not handled by Tailwind.
- Shadcn UI components are integrated and can be customized via `components.json` and direct modifications in `src/components/ui/`.

## Authentication

Authentication is handled by Supabase Auth.

- Users can register and log in using email and password.
- The `AuthContext` provides the authentication state to the entire application.
- `PrivateRoute.jsx` is used to protect routes that require authentication.
-   **Role-Based Access**: After login, the user's role is fetched from the `profiles` table. The application then conditionally renders UI elements and restricts access to certain functionalities (e.g., CRUD operations) based on this role. New users are assigned a 'pending' role by default, requiring manual admin approval in Supabase to gain full access.

## Database Schema

The primary tables in the Supabase PostgreSQL database are:

- **`employees`**: Stores employee details.

  - `id` (UUID, PK)
  - `first_name` (VARCHAR)
  - `last_name` (VARCHAR)
  - `email` (VARCHAR, UNIQUE)
  - `phone` (VARCHAR)
  - `position` (VARCHAR)
  - `department` (VARCHAR)
  - `hire_date` (DATE)
  - `salary` (DECIMAL)
  - `created_at` (TIMESTAMP)
  - `updated_at` (TIMESTAMP)

  * **RLS Policies**: Configured to allow users with the 'admin' role to perform CRUD operations.

- **`profiles`**: Stores additional user profile information, including roles.
  - `id` (UUID, PK, FK to `auth.users`)
  - `username` (VARCHAR, UNIQUE)
  - `role` (TEXT, default 'pending', e.g., 'admin', 'user', 'pending')
  * **RLS Policies**: Configured to allow users to view/update their own profile.

Refer to the [Installation Guide](installation_guide.md) for the SQL schema setup.

## Contributing Guidelines

We welcome contributions to UpDAHD! Please follow these guidelines to ensure a smooth collaboration process.

### Branching Strategy

We use a feature-branch workflow:

1.  Fork the repository.
2.  Create a new branch from `main` for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/issue-description`.
3.  Make your changes.

### Commit Messages

Follow the Conventional Commits specification. Examples:

- `feat: Add employee creation modal`
- `fix: Resolve login redirect issue`
- `docs: Update installation guide`
- `refactor: Improve employee list filtering`

### Pull Requests

1.  Push your branch to your fork.
2.  Open a pull request against the `main` branch of the original repository.
3.  Provide a clear title and description of your changes.
4.  Ensure all tests pass and the code adheres to coding standards.

### Coding Standards

- Adhere to the `.clinerules` defined in the project root for general coding practices, naming conventions, and file size limits.
- Use ESLint (configured in `eslint.config.js`) to maintain code quality.
- Ensure consistent indentation and formatting.

## Testing

(Currently, no explicit testing framework is set up. Future enhancements will include unit and integration tests.)

## Deployment

The application can be deployed to any static site hosting service (e.g., Vercel, Netlify, GitHub Pages) after building the project:

```bash
npm run build
```

This command generates a `dist` folder with the production-ready static assets.

## Troubleshooting

- **Linting errors**: Run `npm run lint` to identify and fix issues.
- **Build failures**: Check the console output for specific error messages. Ensure all dependencies are installed and environment variables are correctly set.
- **Supabase API errors**: Verify network requests in your browser's developer tools. Check Supabase logs for backend errors.

For further assistance, please open an issue on the GitHub repository.
