import React from "react";

// Reuses our existing formatting logic
function formatLabel(value = "") {
  return value.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function PriorityBadge({ priority }) {
  return (
    <span className={`priority-badge priority-${(priority || "MEDIUM").toLowerCase()}`}>
      {formatLabel(priority || "MEDIUM")}
    </span>
  );
}

// A single Kanban card
function TaskCard({ task, onStatusChange, onDelete }) {
  return (
    <div style={{
      padding: "16px",
      marginBottom: "12px",
      borderRadius: "10px",
      backgroundColor: "var(--surface)",
      border: "1px solid var(--border-color)",
      boxShadow: "var(--shadow)",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      <div>
        <h4 style={{ margin: "0 0 4px", fontSize: "14px", color: "var(--text-primary)" }}>{task.title}</h4>
        {task.description && (
          <p style={{ margin: 0, fontSize: "11px", color: "var(--text-secondary)", lineHeight: "1.4" }}>
            {task.description}
          </p>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PriorityBadge priority={task.priority} />
        {task.dueDate && (
          <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>
            ⏳ {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, task, e.target.value)}
          style={{ flex: 1, padding: "6px", fontSize: "11px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--surface-muted)", color: "var(--text-primary)" }}
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button 
          onClick={() => onDelete(task.id)}
          style={{ color: "#dc5050", background: "transparent", border: "1px solid var(--border-color)", borderRadius: "6px", padding: "0 8px", fontSize: "11px", cursor: "pointer" }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default function BoardView({ tasks, handleStatusChange, handleDeleteTask }) {
  // Categorize tasks by status
  const pendingTasks = tasks.filter(t => t.status === "PENDING");
  const inProgressTasks = tasks.filter(t => t.status === "IN_PROGRESS");
  const completedTasks = tasks.filter(t => t.status === "COMPLETED");

  const ColumnHeader = ({ title, count, color, bgColor }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
      <h3 style={{ margin: 0, fontSize: "14px" }}>{title}</h3>
      <span style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "bold", color: color, backgroundColor: bgColor }}>
        {count}
      </span>
    </div>
  );

  return (
    <div style={{ padding: "20px 0" }}>
      <div className="section-heading" style={{ marginBottom: "24px" }}>
        <div>
          <h2>Kanban Board</h2>
          <p>Track your workflow from start to finish.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", alignItems: "start" }}>
        
        {/* Pending Column */}
        <div style={{ backgroundColor: "var(--surface-muted)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
          <ColumnHeader title="Pending" count={pendingTasks.length} color="#b77714" bgColor="#fff5df" />
          {pendingTasks.map(task => (
            <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} onDelete={handleDeleteTask} />
          ))}
          {pendingTasks.length === 0 && <p style={{ fontSize: "12px", color: "var(--text-secondary)", textAlign: "center" }}>No pending tasks</p>}
        </div>

        {/* In Progress Column */}
        <div style={{ backgroundColor: "var(--surface-muted)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
          <ColumnHeader title="In Progress" count={inProgressTasks.length} color="#3276d2" bgColor="#eaf3ff" />
          {inProgressTasks.map(task => (
            <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} onDelete={handleDeleteTask} />
          ))}
          {inProgressTasks.length === 0 && <p style={{ fontSize: "12px", color: "var(--text-secondary)", textAlign: "center" }}>No tasks in progress</p>}
        </div>

        {/* Completed Column */}
        <div style={{ backgroundColor: "var(--surface-muted)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
          <ColumnHeader title="Completed" count={completedTasks.length} color="#21835b" bgColor="#e5f7ed" />
          {completedTasks.map(task => (
            <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} onDelete={handleDeleteTask} />
          ))}
          {completedTasks.length === 0 && <p style={{ fontSize: "12px", color: "var(--text-secondary)", textAlign: "center" }}>No completed tasks</p>}
        </div>

      </div>
    </div>
  );
}