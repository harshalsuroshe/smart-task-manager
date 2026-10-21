import React from "react";

export default function StatCard({ label, value, description, icon, tone }) {
  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>
        <span className={`stat-icon ${tone}`}>{icon}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-description">{description}</div>
    </article>
  );
}