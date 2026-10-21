import React from "react";
import StatCard from "../components/StatCard";
import TaskRow from "../components/TaskRow";

export default function Dashboard({
  activePage,
  greeting,
  isCreatingTask,
  setIsCreatingTask,
  handleCreateTask,
  newTaskTitle,
  setNewTaskTitle,
  newTaskDescription,
  setNewTaskDescription,
  newTaskPriority,
  setNewTaskPriority,
  newTaskDueDate,   
  setNewTaskDueDate,
  isSubmitting,
  apiMessage,
  stats,
  tasks,
  filteredTasks,
  loading,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  handleStatusChange,
  handleDeleteTask,
  handleEditTask,
}) {
  return (
    <>
      <section className="welcome-section">
        <div>
          <p className="eyebrow">
            {activePage === "Dashboard" ? "YOUR WORKSPACE" : "YOUR TASK LIST"}
          </p>
          <h1>{activePage === "Dashboard" ? `${greeting}!` : "My Tasks"}</h1>
          <p className="welcome-subtitle">
            {activePage === "Dashboard"
              ? "Here’s an overview of what’s happening with your work."
              : "Search, filter and keep track of your tasks."}
          </p>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={() => setIsCreatingTask(!isCreatingTask)}
        >
          <span>{isCreatingTask ? "✕" : "＋"}</span>
          {isCreatingTask ? "Cancel" : "Create task"}
        </button>
      </section>

      {/* NEW TASK FORM */}
      {isCreatingTask && (
        <form className="stat-card" style={{ marginBottom: "20px" }} onSubmit={handleCreateTask}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              className="login-input"
              placeholder="Task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              required
              maxLength={150}
            />
            <input
              className="login-input"
              placeholder="Description (optional)"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              maxLength={500}
            />
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <select
                className="login-input"
                style={{ width: "auto" }}
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
              >
                <option value="LOW">Low Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="HIGH">High Priority</option>
              </select>
              {/* --- ADD THIS DATE INPUT --- */}
              <input 
                type="date"
                className="login-input"
                style={{ width: "auto", color: "var(--text-primary)" }}
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
              />
              <button className="primary-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Task"}
              </button>
            </div>
          </div>
        </form>
      )}

      {apiMessage && (
        <div className="api-notice" role="status">
          <span>ⓘ</span>
          <span>{apiMessage}</span>
        </div>
      )}

      {/* STATISTICS */}
      <section className="stats-grid" aria-label="Task statistics" style={{ marginBottom: "20px" }}>
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      {/* PROGRESS TRACKER */}
      <section className="progress-panel">
        <div className="section-heading">
          <div>
            <h2>Task progress</h2>
            <p>A quick snapshot of your workload.</p>
          </div>
          <span className="subtle-tag">Live task data</span>
        </div>
        <div className="progress-summary">
          <div>
            <strong>
              {tasks.length
                ? `${Math.round(
                    (tasks.filter((task) => task.status === "COMPLETED").length /
                      tasks.length) *
                      100
                  )}%`
                : "0%"}
            </strong>
            <span>Overall completion</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${
                  tasks.length
                    ? (tasks.filter((task) => task.status === "COMPLETED").length /
                        tasks.length) *
                      100
                    : 0
                }%`,
              }}
            />
          </div>
          <span className="progress-count">
            {tasks.filter((task) => task.status === "COMPLETED").length} of {tasks.length}
          </span>
        </div>
      </section>

      {/* TASKS TABLE AND FILTERS */}
      <section className="tasks-panel">
        <div className="section-heading tasks-heading">
          <div>
            <h2>{activePage === "Dashboard" ? "Recent tasks" : "All tasks"}</h2>
            <p>Keep your priorities clear and your work moving.</p>
          </div>
          <span className="task-count">{filteredTasks.length} tasks</span>
        </div>
        <div className="task-toolbar">
          <label className="search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search tasks..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="ALL">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <select
            aria-label="Filter by priority"
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            <option value="ALL">All priorities</option>
            <option value="HIGH">High priority</option>
            <option value="MEDIUM">Medium priority</option>
            <option value="LOW">Low priority</option>
          </select>
        </div>
        <div className="table-container">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="empty-state">
                    Loading your tasks...
                  </td>
                </tr>
              ) : filteredTasks.length ? (
                (activePage === "Dashboard" ? filteredTasks.slice(0, 5) : filteredTasks).map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-state">
                    <div className="empty-icon">▤</div>
                    <strong>No tasks to display</strong>
                    <p>
                      {search || statusFilter !== "ALL" || priorityFilter !== "ALL"
                        ? "Try changing your search or filters."
                        : "Sign in or create a task to get started."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}