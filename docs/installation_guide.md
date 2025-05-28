# Installation Guide for UpDAHD

This guide provides step-by-step instructions to set up and run the UpDAHD Employee Management System on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: Version 18 or higher. You can download it from [nodejs.org](https://nodejs.org/).
-   **npm** (Node Package Manager): Comes bundled with Node.js.
-   **Git**: For cloning the repository. You can download it from [git-scm.com](https://git-scm.com/).
-   **Supabase Account**: UpDAHD uses Supabase for its backend (authentication and database). If you don't have one, sign up at [supabase.com](https://supabase.com/).

## Step 1: Clone the Repository

First, clone the UpDAHD repository to your local machine:

```bash
git clone https://github.com/your-username/UpDAHD.git # Replace with actual repo URL
cd UpDAHD
```

## Step 2: Install Dependencies

Navigate into the project directory and install the necessary Node.js dependencies:

```bash
npm install
```

## Step 3: Set up Supabase

UpDAHD relies on Supabase for its backend services.

1.  **Create a New Project in Supabase**:
    *   Go to your [Supabase Dashboard](https://app.supabase.com/).
    *   Click "New project" and follow the prompts to create a new project.
    *   Choose a strong database password and select a region close to you.

2.  **Get Your Supabase Project URL and Anon Key**:
    *   Once your project is created, navigate to `Project Settings` > `API`.
    *   You will find your `Project URL` and `Anon (public) key`. Keep these handy.

3.  **Configure Database Schema**:
    *   In your Supabase project, go to the `SQL Editor`.
    *   Run the following SQL commands to set up the necessary tables and RLS policies.

    ```sql
    -- Create employees table
    CREATE TABLE employees (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(20),
      position VARCHAR(255),
      department VARCHAR(255),
      hire_date DATE,
      salary DECIMAL(10, 2),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Enable Row Level Security (RLS) for employees table
    ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

    -- Policy for authenticated users to view their own data (if applicable, or all if public)
    CREATE POLICY "Employees are viewable by authenticated users." ON employees
      FOR SELECT USING (auth.role() = 'authenticated');

    -- Policy for admins to insert employees
    CREATE POLICY "Admins can insert employees." ON employees
      FOR INSERT WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

    -- Policy for admins to update employees
    CREATE POLICY "Admins can update employees." ON employees
      FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

    -- Policy for admins to delete employees
    CREATE POLICY "Admins can delete employees." ON employees
      FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

    ```

4.  **Create `.env.local` file**:
    *   In the root of your project directory, create a file named `.env.local`.
    *   Add your Supabase credentials to this file:

    ```
    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```
    Replace `"YOUR_SUPABASE_PROJECT_URL"` and `"YOUR_SUPABASE_ANON_KEY"` with the values you obtained from your Supabase dashboard.

## Step 4: Run the Application

Once all dependencies are installed and Supabase is configured, you can start the development server:

```bash
npm run dev
```

This will start the application, usually accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Troubleshooting

-   **`npm install` errors**: Ensure Node.js and npm are correctly installed and updated. Clear npm cache (`npm cache clean --force`) and try again.
-   **Supabase connection issues**: Double-check your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`. Ensure your Supabase project is active and the API keys are correct.
-   **Database schema issues**: Verify that you have run all the SQL commands correctly in the Supabase SQL Editor. Check for any errors during SQL execution.
-   **Port already in use**: If `npm run dev` fails due to a port conflict, you might need to stop the process using that port or configure Vite to use a different port (see Vite documentation).
