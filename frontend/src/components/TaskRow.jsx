import React, { useState } from "react";

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

export default function TaskRow({ task, onStatusChange, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || ""); // New date state

  async function handleSave() {
    await onEdit(task.id, {
      ...task,
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      dueDate: editDueDate || null, // Save the new date
    });
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <tr>
        <td>
          <input
            className="login-input" style={{ marginBottom: "5px", minHeight: "32px", fontSize: "12px" }}
            value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            className="login-input" style={{ minHeight: "28px", fontSize: "11px" }}
            value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Description..."
          />
        </td>
        <td>
          <select
            className="login-input" style={{ minHeight: "32px", fontSize: "11px", padding: "0 8px" }}
            value={editPriority} onChange={(e) => setEditPriority(e.target.value)}
          >
            <option value="LOW">Low</option><option value="MEDIUM">Medium</option><option value="HIGH">High</option>
          </select>
        </td>
        <td>
          <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{formatLabel(task.status)}</span>
        </td>
        {/* NEW: Edit Date Field */}
        <td>
          <input
            type="date"
            className="login-input" style={{ minHeight: "32px", fontSize: "11px", padding: "0 8px", color: "var(--text-primary)" }}
            value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)}
          />
        </td>
        <td className="task-date">
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button onClick={handleSave} className="primary-button" style={{ minHeight: "28px", padding: "0 10px", fontSize: "11px" }}>Save</button>
            <button onClick={() => setIsEditing(false)} style={{ color: "var(--text-secondary)", background: "transparent", border: "none", fontSize: "11px" }}>Cancel</button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <div className="task-name">{task.title}</div>
        <div className="task-description">{task.description || "No description added"}</div>
      </td>
      <td><PriorityBadge priority={task.priority} /></td>
      <td>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, task, e.target.value)}
          style={{ padding: "4px 8px", fontSize: "11px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--surface)", color: "var(--text-primary)" }}
        >
          <option value="PENDING">Pending</option><option value="IN_PROGRESS">In progress</option><option value="COMPLETED">Completed</option>
        </select>
      </td>
      {/* NEW: View Date Field */}
      <td className="task-date">
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
      </td>
      <td className="task-date">
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setIsEditing(true)} style={{ color: "var(--accent)", background: "transparent", border: "none", fontSize: "12px", fontWeight: "600" }}>Edit</button>
          <button onClick={() => onDelete(task.id)} style={{ color: "#dc5050", background: "transparent", border: "none", fontSize: "12px", fontWeight: "600" }}>Delete</button>
        </div>
      </td>
    </tr>
  );
}