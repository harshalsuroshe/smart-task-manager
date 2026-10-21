import React, { useState } from "react";

export default function Login({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  handleLogin,
  handleRegister, 
  loggingIn, 
  loginError 
}) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      handleLogin(e);
    } else {
      handleRegister(e, name);
    }
  };

  return (
    <main style={{
      display: "flex",
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "var(--background)",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "var(--surface)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        overflow: "hidden",
        width: "100%",
        maxWidth: "900px",
        height: "600px"
      }}>
        
        {/* LEFT SIDE - Creative Graphic/Branding Area */}
        <div style={{
          flex: "1",
          background: "linear-gradient(135deg, var(--accent) 0%, #2a5298 100%)",
          color: "white",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative"
        }} className="auth-brand-panel">
          <div>
            <div className="brand-logo" style={{ backgroundColor: "white", color: "var(--accent)" }}>T</div>
            <h1 style={{ fontSize: "2.5rem", marginTop: "20px", marginBottom: "10px", color: "white" }}>TaskFlow</h1>
            <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
              {isLoginView 
                ? "Welcome back! Pick up right where you left off and conquer your day." 
                : "Join TaskFlow today. Organize your life, team, and projects beautifully."}
            </p>
          </div>
          
          <div style={{ opacity: 0.8, fontSize: "0.9rem" }}>
            © {new Date().getFullYear()} TaskFlow. Smart Task Manager.
          </div>
        </div>

        {/* RIGHT SIDE - The Form */}
        <div style={{
          flex: "1",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          
          {/* Toggle Switch */}
          <div style={{
            display: "flex",
            backgroundColor: "var(--surface-muted)",
            borderRadius: "12px",
            padding: "4px",
            marginBottom: "30px"
          }}>
            <button 
              type="button"
              onClick={() => setIsLoginView(true)}
              style={{
                flex: 1, padding: "10px", borderRadius: "8px", border: "none",
                fontWeight: "600", cursor: "pointer", transition: "all 0.3s ease",
                backgroundColor: isLoginView ? "var(--surface)" : "transparent",
                color: isLoginView ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow: isLoginView ? "0 2px 8px rgba(0,0,0,0.1)" : "none"
              }}
            >
              Log In
            </button>
            <button 
              type="button"
              onClick={() => setIsLoginView(false)}
              style={{
                flex: 1, padding: "10px", borderRadius: "8px", border: "none",
                fontWeight: "600", cursor: "pointer", transition: "all 0.3s ease",
                backgroundColor: !isLoginView ? "var(--surface)" : "transparent",
                color: !isLoginView ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow: !isLoginView ? "0 2px 8px rgba(0,0,0,0.1)" : "none"
              }}
            >
              Sign Up
            </button>
          </div>

          <h2 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>
            {isLoginView ? "Sign in to your account" : "Create a new account"}
          </h2>

          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            
            {/* Fixed-height container for Name or Pro Tip */}
            <div style={{ height: "65px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              {!isLoginView ? (
                <>
                  <label className="login-label" htmlFor="register-name" style={{ marginBottom: "4px" }}>Full Name</label>
                  <input
                    id="register-name"
                    className="login-input"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="John Doe"
                    required={!isLoginView}
                    style={{ margin: 0 }}
                  />
                </>
              ) : (
                <div style={{ 
                  padding: "12px", 
                  backgroundColor: "var(--surface-muted)", 
                  borderRadius: "8px", 
                  fontSize: "0.85rem", 
                  color: "var(--text-secondary)", 
                  textAlign: "center",
                  border: "1px dashed var(--border-color)"
                }}>
                  💡 <strong>Pro tip:</strong> Login if you have previous session!!
                </div>
              )}
            </div>
            
            {/* EMAIL FIELD */}
            <div>
              <label className="login-label" htmlFor="auth-email">Email address</label>
              <input
                id="auth-email"
                className="login-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            
            {/* PASSWORD FIELD */}
            <div>
              <label className="login-label" htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                className="login-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            {loginError && (
              <div className="api-notice" role="alert">
                {loginError}
              </div>
            )}
            
            <button
              className="primary-button"
              type="submit"
              disabled={loggingIn}
              style={{ marginTop: "10px", padding: "12px", fontSize: "1rem" }}
            >
              {loggingIn 
                ? (isLoginView ? "Signing in..." : "Creating account...") 
                : (isLoginView ? "Sign In" : "Create Account")}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}