# User Guide for UpDAHD

This guide provides instructions on how to use the UpDAHD Employee Management System, from initial access to managing employee records.

## Table of Contents

-   [Accessing the Application](#accessing-the-application)
-   [Registration and Login](#registration-and-login)
-   [Dashboard Overview](#dashboard-overview)
-   [Managing Employees](#managing-employees)
    -   [Viewing Employee List](#viewing-employee-list)
    -   [Adding a New Employee](#adding-a-new-employee)
    -   [Viewing Employee Details](#viewing-employee-details)
    -   [Editing Employee Information](#editing-employee-information)
    -   [Deleting an Employee](#deleting-an-employee)
-   [Theme Toggle (Light/Dark Mode)](#theme-toggle-lightdark-mode)
-   [Troubleshooting Common Issues](#troubleshooting-common-issues)

## Accessing the Application

Once the application is running (refer to the [Installation Guide](installation_guide.md)), open your web browser and navigate to the address where the application is hosted, typically `http://localhost:5173`.

## Login

1.  On the login page, enter your registered email and password.
2.  Click "Login".
3.  Upon successful login, you will be redirected to the application dashboard.

## Dashboard Overview

The dashboard provides a summary of key employee metrics and quick access to common actions. Depending on your role (if role-based access control is implemented), you may see different information or options.

## Managing Employees

### Viewing Employee List

*   From the sidebar, click on "Employees" to navigate to the employee list page.
*   Here, you will see a table or list of all registered employees.
*   You can use the search bar to find employees by name, email, or other criteria.
*   Sorting and filtering options may be available to organize the list.

### Adding a New Employee

1.  On the employee list page, click the "Add Employee" button.
2.  A form will appear (likely a modal or a new page).
3.  Fill in the required employee details such as:
    *   First Name
    *   Last Name
    *   Email (must be unique)
    *   Phone Number
    *   Position
    *   Department
    *   Hire Date
    *   Salary
4.  Click "Save" or "Add" to create the new employee record.

### Viewing Employee Details

*   From the employee list, click on an employee's name or a "View Details" button next to their entry.
*   This will take you to a dedicated page showing all the information for that specific employee, including their progress history (if applicable).

### Editing Employee Information

1.  From the employee details page, or sometimes directly from the employee list, click the "Edit" button (often represented by a pencil icon).
2.  An editable form will appear, pre-filled with the employee's current information.
3.  Make the necessary changes to the fields.
4.  Click "Save Changes" or "Update" to apply your modifications.

### Deleting an Employee

1.  From the employee details page or the employee list, locate the "Delete" button (often represented by a trash can icon).
2.  Clicking this button will usually trigger a confirmation dialog to prevent accidental deletions.
3.  Confirm your action to permanently remove the employee record from the system. **This action is irreversible.**

## Theme Toggle (Light/Dark Mode)

UpDAHD supports both light and dark themes. Look for a "Theme Toggle" button or switch (often a sun/moon icon) in the header or sidebar. Clicking it will switch the application's appearance between light and dark modes.

## Troubleshooting Common Issues

*   **Cannot log in**:
    *   Double-check your email and password.
    *   Ensure your account has been verified via email (if Supabase email confirmation is enabled).
    *   If you forgot your password, use the "Forgot Password" option (if available).
*   **Data not loading/saving**:
    *   Ensure you have a stable internet connection.
    *   Verify that your Supabase project is active and correctly configured (refer to the [Installation Guide](installation_guide.md)).
    *   Check the browser's developer console for any error messages.
*   **Page not found**:
    *   Ensure the application is running correctly (`npm run dev`).
    *   Verify the URL in your browser's address bar.

If you encounter persistent issues, please refer to the [Developer Documentation](developer_documentation.md) or contact support.
