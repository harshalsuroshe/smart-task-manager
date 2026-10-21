# Smart Task & Project Manager

## 1. Project Objective

Build a full-stack web application that allows users to organize projects, manage tasks, and track their work. The application will be developed incrementally to understand frontend, backend, database, testing, and security workflows.

## 2. Technology Stack

- Frontend: React, JavaScript, CSS
- Backend: Java, Spring Boot
- Database: MySQL
- Build tool: Maven
- Version control: Git and GitHub
- Testing: JUnit and Spring Boot testing tools
- Authentication: Spring Security and JWT

## 3. MVP Requirements

### Task Management
- Create, view, edit, and delete tasks.
- Each task has a title, description, status, priority, and optional due date.
- Status values: PENDING, IN_PROGRESS, COMPLETED.
- Priority values: LOW, MEDIUM, HIGH.

### Dashboard
- Display task counts by status.
- Display recent tasks.

### Search and Filtering
- Search tasks and filter by status, priority, and project.

### Project Management
- Create and view projects.
- Assign tasks to projects.
- Filter tasks by project.

### Authentication
- Register and log in.
- Protect backend endpoints.
- Restrict access to each user's own data.

## 4. Development Order

1. Finalize requirements and project structure.
2. Generate and understand the initial frontend UI.
3. Create the Java Spring Boot backend.
4. Implement and test a simple REST API.
5. Connect the frontend to the backend.
6. Connect MySQL and implement persistent task CRUD.
7. Implement project management and task-project relationships.
8. Add authentication and authorization.
9. Add automated tests, error handling, and security improvements.
10. Document, version-control, and prepare the application for deployment.

## 5. Initial Scope Exclusions

Comments, attachments, notifications, and other advanced features are excluded from the MVP. They may be considered after the core application works.

## 6. Definition of Done

A feature is complete when:
- It meets its agreed requirements.
- Its expected behavior has been tested.
- Errors are handled appropriately.
- The frontend and backend work together when integration is required.
- Data persists in MySQL when persistence is required.
- The relevant documentation is updated.