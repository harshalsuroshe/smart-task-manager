import { useState, useEffect } from 'react';
import './App.css';

// Mock data (replace with API calls later)
// Status: PENDING, IN_PROGRESS, COMPLETED | Priority: LOW, MEDIUM, HIGH

const NAV_ITEMS = [
  { name: 'Dashboard', label: 'Dashboard', initial: 'D', color: '#3b82f6' },
  { name: 'My Tasks', label: 'My Tasks', initial: 'T', color: '#10b981' },
  { name: 'Projects', label: 'Projects', initial: 'P', color: '#a855f7' },
  { name: 'Settings', label: 'Settings', initial: 'S', color: '#6b7280' },
];

const STAT_CARDS = [
  { label: 'Total Tasks', value: '24', description: 'across all projects' },
  { label: 'Pending', value: '8', description: 'require attention' },
  { label: 'In Progress', value: '7', description: 'being worked on' },
  { label: 'Completed', value: '9', description: 'finished this week' },
];

const RECENT_TASKS = [
  { id: 1, title: 'Design homepage mockup', priority: 'High', status: 'In Progress', dueDate: 'Oct 20, 2026' },
  { id: 2, title: 'Setup project repository', priority: 'Medium', status: 'Completed', dueDate: 'Oct 15, 2026' },
  { id: 3, title: 'Implement user authentication', priority: 'High', status: 'Pending', dueDate: 'Oct 25, 2026' },
  { id: 4, title: 'Write API documentation', priority: 'Low', status: 'Pending', dueDate: 'Oct 30, 2026' },
  { id: 5, title: 'Fix navigation bug', priority: 'Medium', status: 'In Progress', dueDate: 'Oct 21, 2026' },
];


const STATUS_COLORS = {
  Pending: 'var(--status-pending)',
  PENDING: 'var(--status-pending)',

  'In Progress': 'var(--status-progress)',
  IN_PROGRESS: 'var(--status-progress)',

  Completed: 'var(--status-completed)',
  COMPLETED: 'var(--status-completed)',
};

const PRIORITY_COLORS = {
  High: 'var(--priority-high)',
  HIGH: 'var(--priority-high)',

  Medium: 'var(--priority-medium)',
  MEDIUM: 'var(--priority-medium)',

  Low: 'var(--priority-low)',
  LOW: 'var(--priority-low)',
};


function Sidebar({ activeItem, onSelect }) {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar-brand"><span className="sidebar-brand-mark">T</span><span className="sidebar-brand-name">TaskFlow</span></div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = activeItem === item.name;
          return (
            <button key={item.name} type="button" className={`sidebar-item ${isActive ? 'sidebar-item--active' : ''}`} onClick={() => onSelect(item.name)} aria-pressed={isActive}>
              <span className="sidebar-item-icon" style={{ backgroundColor: item.color }}>{item.initial}</span>
              <span className="sidebar-item-text">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function StatCard({ label, value, description }) {
  return (
    <div className="stat-card"><span className="stat-card-label">{label}</span><span className="stat-card-value">{value}</span><span className="stat-card-desc">{description}</span></div>
  );
}

function StatusBadge({ status }) {
  const label = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
  }[status] ?? status;

  return (
    <span
      className="badge badge--status"
      style={{ color: STATUS_COLORS[status] }}
    >
      {label}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const label = {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
  }[priority] ?? priority;

  return (
    <span
      className="badge badge--priority"
      style={{ color: PRIORITY_COLORS[priority] }}
    >
      {label}
    </span>
  );
}

function TaskRow({ task }) {
  return (
    <tr className="task-row">
      <td className="task-title">{task.title}</td>
      <td className="task-priority"><PriorityBadge priority={task.priority} /></td>
      <td className="task-status"><StatusBadge status={task.status} /></td>
      <td className="task-due">{task.dueDate}</td>
    </tr>
  );
}

function AddTaskButton({ onClick }) {
  return (
    <button
      type="button"
      className="btn btn--primary btn--add"
      onClick={onClick}
    >
      <span aria-hidden="true">+</span> Add Task
    </button>
  );
}

function RecentTasks({ tasks }) {
  return (
    <section className="card recent-tasks-card" aria-label="Recent tasks">
      <div className="card-header"><h2 className="card-title">Recent Tasks</h2></div>
      <div className="table-wrap">
        <table className="tasks-table">
          <thead>
            <tr><th scope="col">Title</th><th scope="col">Priority</th><th scope="col">Status</th><th scope="col" className="tasks-table-cell--due">Due Date</th></tr>
          </thead>
          <tbody>{tasks.map((task) => <TaskRow key={task.id} task={task} />)}</tbody>
        </table>
      </div>
    </section>
  );
}

function App() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);


  const [backendMessage, setBackendMessage] = useState("Connecting...");

  useEffect(() => {
    fetch("http://localhost:8080/api/health")
      .then(response => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }
        return response.json();
      })
      .then(data => {
        setBackendMessage(
          data.application + " backend status: " + data.status
        );
      })
      .catch(error => {
        console.error("Backend connection error:", error);
        setBackendMessage("Could not connect to backend");
      });
  }, []);


  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);



  return (
    <div className="app">
      <Sidebar activeItem={activeItem} onSelect={setActiveItem} />
      <main className="main-content">
        <header className="dashboard-header">
          <div className="dashboard-greeting">
            <h1 className="dashboard-title">Good morning!</h1>
            <p className="dashboard-subtitle">Here is a quick look at your tasks for today.</p>
            <p>{backendMessage}</p>
          </div>
          <AddTaskButton onClick={() => setIsAddTaskOpen(true)} />
        </header>
        {isAddTaskOpen && (
      <section className="card add-task-form">
        <h2>Create a Task</h2>

        <label htmlFor="taskTitle">Task title</label>
        <input
          id="taskTitle"
          type="text"
          placeholder="Enter task title"
        />

        <button
          type="button"
          onClick={() => setIsAddTaskOpen(false)}
        >
          Close
        </button>
      </section>
    )}
        <section className="stats-section">
          <div className="stats-grid">{STAT_CARDS.map((card) => <StatCard key={card.label} {...card} />)}</div>
        </section>

        

        <RecentTasks tasks={tasks} />
      </main>
    </div>
  );
}

export default App;
