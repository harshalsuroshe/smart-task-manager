const API_URL = "http://localhost:8080";

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json().catch(() => ({}));
  
  if (!response.ok) {
    throw new Error(data.message || data.error || `Login failed (HTTP ${response.status})`);
  }
  if (!data.token) {
    throw new Error("No token received from backend.");
  }
  return data;
}

export async function fetchTasks(token, signal) {
  const response = await fetch(`${API_URL}/api/tasks`, {
    signal,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  
  if (response.status === 401 || response.status === 403) {
    throw new Error("UNAUTHORIZED"); // Special flag so App.jsx knows to log the user out
  }
  if (!response.ok) {
    throw new Error(`Failed to load tasks (HTTP ${response.status})`);
  }
  
  const data = await response.json();
  return Array.isArray(data) ? data : data.tasks || [];
}

export async function createNewTask(token, taskData) {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) throw new Error("Failed to create task");
  return await response.json();
}

export async function updateTaskById(token, taskId, taskData) {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) throw new Error("Failed to update status");
  return await response.json();
}

export async function deleteTaskById(token, taskId) {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (!response.ok) throw new Error("Failed to delete task");
  return true;
}

export async function registerUser(name, email, password) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json().catch(() => ({}));
  
  if (!response.ok) {
    throw new Error(data.message || data.error || `Registration failed (HTTP ${response.status})`);
  }
  return data;
}