import React from "react";

// All navigation items are defined here for the sidebar
const NAV_ITEMS = [
  { label: "Dashboard", icon: "⌂", group: "WORKSPACE" },
  { label: "My Tasks", icon: "▤", group: "WORKSPACE" },
  { label: "Calendar", icon: "▦", group: "WORKSPACE", upcoming: true },
  { label: "Board View", icon: "▥", group: "WORKSPACE", upcoming: true },
  { label: "Projects", icon: "▣", group: "WORKSPACE", upcoming: true },
  { label: "Reports", icon: "▧", group: "INSIGHTS", upcoming: true },
  { label: "Settings", icon: "⚙", group: "PERSONAL", upcoming: true },
];

export default function Sidebar({ activePage, onNavigate, onLogout }) {
  const groups = ["WORKSPACE", "INSIGHTS", "PERSONAL"];
  
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">T</div>
        <div>
          <div className="brand-name">TaskFlow</div>
          <div className="brand-caption">SMART TASK MANAGER</div>
        </div>
      </div>
      <button className="workspace-switcher" type="button">
        <span className="workspace-avatar">H</span>
        <span className="workspace-details">
          <strong>My Workspace</strong>
          <small>Personal workspace</small>
        </span>
        <span className="workspace-chevron">⌄</span>
      </button>
      
      <nav className="sidebar-navigation" aria-label="Main navigation">
        {groups.map((group) => {
          const items = NAV_ITEMS.filter((item) => item.group === group);
          if (!items.length) return null;
          return (
            <div className="nav-group" key={group}>
              <p className="nav-heading">{group}</p>
              {items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`nav-item ${activePage === item.label ? "active" : ""}`}
                  onClick={() => onNavigate(item.label)}
                  aria-current={activePage === item.label ? "page" : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.upcoming && <span className="nav-upcoming">Soon</span>}
                </button>
              ))}
            </div>
          );
        })}
      </nav>
      
      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-icon">✦</div>
          <strong>Stay organized</strong>
          <p>Small steps lead to big results.</p>
        </div>
        <button className="sidebar-logout" type="button" onClick={onLogout}>
          <span className="nav-icon">↪</span>
          Sign out
        </button>
        <div className="sidebar-version">TaskFlow · Development</div>
      </div>
    </aside>
  );
}