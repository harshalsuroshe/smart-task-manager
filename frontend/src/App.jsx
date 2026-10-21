import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

import BoardView from "./pages/BoardView";
import { loginUser, registerUser, fetchTasks, createNewTask, updateTaskById, deleteTaskById } from "./services/api";



//const API_URL = "http://localhost:8080";


function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // --- New Task Form State ---
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("MEDIUM");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  // Read the JWT saved by a previous successful login.
  const [token, setToken] = useState(
    () => localStorage.getItem("taskflow_token")
  );
  // Store the login form values.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  
  // Store the signed-in user's basic profile.
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("taskflow_user");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Fetch tasks from Spring Boot.
// --- LOAD TASKS ---
  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    
    async function loadTasks() {
      setLoading(true);
      try {
        const data = await fetchTasks(token, controller.signal);
        setTasks(data);
      } catch (error) {
        if (error.message === "UNAUTHORIZED") {
          handleLogout();
        } else if (error.name !== "AbortError") {
          console.error("Load error:", error);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    
    loadTasks();
    return () => controller.abort();
  }, [token]);

  // Calculate statistics from real API data instead of hardcoded numbers.
  const stats = useMemo(() => {
    const pending = tasks.filter((task) => task.status === "PENDING").length;
    const inProgress = tasks.filter((task) => task.status === "IN_PROGRESS").length;
    const completed = tasks.filter((task) => task.status === "COMPLETED").length;
    return [
      {
        label: "Total tasks",
        value: tasks.length,
        description: "Across your task list",
        icon: "▤",
        tone: "purple",
      },
      {
        label: "Pending",
        value: pending,
        description: "Waiting to be started",
        icon: "◷",
        tone: "amber",
      },
      {
        label: "In progress",
        value: inProgress,
        description: "Currently underway",
        icon: "↗",
        tone: "blue",
      },
      {
        label: "Completed",
        value: completed,
        description: tasks.length
          ? `${Math.round((completed / tasks.length) * 100)}% of all tasks`
          : "No tasks completed yet",
        icon: "✓",
        tone: "green",
      },
    ];
  }, [tasks]);

  // Search and filters run in the frontend against the tasks we have loaded.
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        `${task.title || ""} ${task.description || ""}`
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "ALL" || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  // Authenticate against the existing Spring Boot login endpoint.
// --- LOGIN ---
  async function handleLogin(event) {
    event.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const data = await loginUser(email.trim(), password);
      localStorage.setItem("taskflow_token", data.token);
      localStorage.setItem("taskflow_user", JSON.stringify(data.user));
      setCurrentUser(data.user);
      setToken(data.token);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoggingIn(false);
    }
  }

  // --- REGISTER ---
async function handleRegister(event, name) {
  event.preventDefault();
  setLoggingIn(true);
  setLoginError("");
  try {
    const data = await registerUser(name, email.trim(), password);

    // If your backend auto-logs the user in and returns a token:
    if (data.token) {
      localStorage.setItem("taskflow_token", data.token);
      localStorage.setItem("taskflow_user", JSON.stringify(data.user));
      setCurrentUser(data.user);
      setToken(data.token);
    } else {
      // If it just creates the account, you might need to tell them to log in now
      setLoginError("Account created! Please toggle to Log In to continue.");
    }
  } catch (error) {
    setLoginError(error.message);
  } finally {
    setLoggingIn(false);
  }
}


  // Handle new task submission
async function handleCreateTask(event) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const createdTask = await createNewTask(token, {
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim(),
        status: "PENDING",
        priority: newTaskPriority,
        dueDate: newTaskDueDate || null,
      });
      setTasks((prev) => [...prev, createdTask]);
      setNewTaskTitle(""); 
      setNewTaskDescription("");
      setNewTaskDueDate("");
      setIsCreatingTask(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle changing a task's status
// --- UPDATE TASK STATUS ---
  async function handleStatusChange(taskId, currentTask, newStatus) {
    try {
      const updatedTask = await updateTaskById(token, taskId, { ...currentTask, status: newStatus });
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (error) {
      alert(error.message);
    }
  }

  // --- EDIT TASK ---
  async function handleEditTask(taskId, updatedTaskData) {
    try {
      const updatedTask = await updateTaskById(token, taskId, updatedTaskData);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (error) {
      alert(error.message);
    }
  }

  // Handle deleting a task
// --- DELETE TASK ---
  async function handleDeleteTask(taskId) {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTaskById(token, taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {
      alert(error.message);
    }
  }
  
  // Clear local authentication and return to the login screen.
  function handleLogout() {
    localStorage.removeItem("taskflow_token");
    localStorage.removeItem("taskflow_user");
    setToken(null);
    setCurrentUser(null);
    setTasks([]);
    setPassword("");
    setLoginError("");
    setApiMessage("");
    setShowProfile(false);
  }

  // Show the login screen until the user has a saved JWT.
// Show the login screen until the user has a saved JWT.
  if (!token) {
    return (
      <div className={`app-shell ${darkMode ? "dark-theme" : ""}`}>
        <Login 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          loggingIn={loggingIn}
          loginError={loginError}
        />
      </div>
    );
  }

  const greeting = new Date().getHours() < 12
    ? "Good morning"
    : new Date().getHours() < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className={`app-shell ${darkMode ? "dark-theme" : ""}`}>
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={handleLogout}
      />
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-separator">/</span>
            <strong>{activePage}</strong>
          </div>
          <div className="topbar-actions">
            <button
              className="icon-button theme-button"
              type="button"
              title="Toggle color theme"
              aria-label="Toggle color theme"
              onClick={() => setDarkMode((current) => !current)}
            >
              {darkMode ? "☀" : "☾"}
            </button>
            <div className="menu-anchor">
              <button
                className="icon-button notification-button"
                type="button"
                aria-label="Notifications"
                onClick={() => {
                  setShowNotifications((value) => !value);
                  setShowProfile(false);
                }}
              >
                ♧
                <span className="notification-dot" />
              </button>
              {showNotifications && (
                <div className="floating-menu">
                  <strong>Notifications</strong>
                  <p>You’re all caught up.</p>
                  <small>Task reminders can be added in a future step.</small>
                </div>
              )}
            </div>
            <div className="menu-anchor">
              <button
                className="profile-button"
                type="button"
                onClick={() => {
                  setShowProfile((value) => !value);
                  setShowNotifications(false);
                }}
              >
                <span className="profile-avatar">H</span>
                <span className="profile-text">
                <strong>{currentUser?.name || "My Account"}</strong>
                <small>{currentUser?.email || "Workspace member"}</small>
                </span>
                <span>⌄</span>
              </button>
              {showProfile && (
                <div className="floating-menu profile-menu">
                  <strong>My Account</strong>
                  <button type="button" onClick={() => setActivePage("Settings")}>
                    Account settings
                  </button>
                  <button type="button" onClick={handleLogout}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {activePage === "Dashboard" || activePage === "My Tasks" ? (
          <Dashboard 
            // ... all your existing Dashboard props ...
            activePage={activePage}
            greeting={greeting}
            isCreatingTask={isCreatingTask}
            setIsCreatingTask={setIsCreatingTask}
            handleCreateTask={handleCreateTask}
            newTaskTitle={newTaskTitle}
            setNewTaskTitle={setNewTaskTitle}
            newTaskDescription={newTaskDescription}
            setNewTaskDescription={setNewTaskDescription}
            newTaskPriority={newTaskPriority}
            setNewTaskPriority={setNewTaskPriority}
            newTaskDueDate={newTaskDueDate}
            setNewTaskDueDate={setNewTaskDueDate}
            isSubmitting={isSubmitting}
            apiMessage={apiMessage}
            stats={stats}
            tasks={tasks}
            filteredTasks={filteredTasks}
            loading={loading}
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            handleStatusChange={handleStatusChange}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        ) : activePage === "Board View" ? (
          <BoardView 
            tasks={tasks} 
            handleStatusChange={handleStatusChange} 
            handleDeleteTask={handleDeleteTask} 
          />
        ) : (
          <section className="coming-soon-panel">
            <div className="coming-soon-icon">✦</div>
            <p className="eyebrow">TASKFLOW WORKSPACE</p>
            <h1>{activePage}</h1>
            <p>
              This section is part of our roadmap. We’ll build its interface
              and connect the required backend features in a later stage.
            </p>
            <span className="subtle-tag">Coming soon</span>
            <button
              className="secondary-button"
              type="button"
              onClick={() => setActivePage("Dashboard")}
            >
              ← Back to dashboard
            </button>
          </section>
        )}
        
        <footer className="app-footer">
          <span>TaskFlow</span>
          <span>Plan your work. Make progress.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;