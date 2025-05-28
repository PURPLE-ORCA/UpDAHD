# UpDAHD: Employee Management System

UpDAHD is a modern, full-stack employee management system designed to streamline HR operations. It provides features for managing employee information, tracking progress, and facilitating communication within an organization.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Employee Dashboard**: Overview of employee data and key metrics.
- **Employee List**: Comprehensive list of all employees with search and filter options.
- **Employee Details**: Detailed view of individual employee profiles, including personal information, contact details, and progress history.
- **Add/Edit/Delete Employees**: CRUD operations for managing employee records.
- **Authentication**: Secure user registration and login.
- **Role-Based Access Control**: Differentiate between admin and regular user roles (future enhancement).
- **Theming**: Light and dark mode support.

## Installation

Please refer to the [Installation Guide](docs/installation_guide.md) for detailed steps on how to set up and run the project locally.

## Usage

For instructions on how to use the UpDAHD application, including user registration, login, and managing employees, please refer to the [User Guide](docs/user_guide.md).

## Project Structure

```
.
├── public/                 # Public assets (e.g., vite.svg)
├── src/
│   ├── assets/             # Static assets (e.g., react.svg)
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Shadcn UI components
│   ├── context/            # React Context APIs (Auth, Theme)
│   ├── lib/                # Utility functions
│   ├── App.css             # Global CSS styles
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point for React application
│   └── supabaseClient.js   # Supabase client initialization
├── .gitignore              # Git ignore file
├── components.json         # Shadcn UI configuration
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML file
├── jsconfig.json           # JavaScript configuration
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Locked dependencies
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project README
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build configuration
```

## Technologies Used

- **Frontend**: React.js, Vite, Tailwind CSS, Shadcn UI
- **Backend/Database**: Supabase (Authentication, Database)
- **State Management**: React Context API
- **Linting**: ESLint

## Contributing

Contributions are welcome! Please see the [Developer Documentation](docs/developer_documentation.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License.
