"use client";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    (async () => {
      const gsap = (await import("gsap")).default;
      gsap.fromTo(
        ".login-card",
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    })();
  }, []);

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#0f172a" }}>
      <div className="login-container" style={{ width: "100%", maxWidth: 440, padding: 16 }}>
        <div className="login-card" style={{ background: "#ffffff", borderRadius: 16, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
          <div className="login-header" style={{ textAlign: "center", marginBottom: 24 }}>
            <div className="logo" style={{ fontSize: 56, color: "#6366f1", marginBottom: 8 }}>
              <i className="fas fa-user-circle" />
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>Welcome Back</h1>
            <p style={{ color: "#6b7280" }}>Sign in to your account</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Demo login successful");
            }}
            className="login-form"
          >
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label htmlFor="email" style={{ display: "block", fontSize: 12, marginBottom: 6, color: "#374151" }}>Email</label>
              <div style={{ position: "relative" }}>
                <i className="fas fa-envelope" style={{ position: "absolute", top: 12, left: 12, color: "#9ca3af" }} />
                <input id="email" type="email" required placeholder="Enter your email" style={{ width: "100%", padding: "12px 12px 12px 38px", borderRadius: 10, border: "2px solid #e5e7eb" }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label htmlFor="password" style={{ display: "block", fontSize: 12, marginBottom: 6, color: "#374151" }}>Password</label>
              <div style={{ position: "relative" }}>
                <i className="fas fa-lock" style={{ position: "absolute", top: 12, left: 12, color: "#9ca3af" }} />
                <input id="password" type={showPassword ? "text" : "password"} required placeholder="Enter your password" style={{ width: "100%", padding: "12px 44px 12px 38px", borderRadius: 10, border: "2px solid #e5e7eb" }} />
                <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: "absolute", top: 8, right: 8, height: 36, width: 36, borderRadius: 8, border: "1px solid #e5e7eb", background: "#f9fafb" }}>
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <label style={{ display: "flex", gap: 8, alignItems: "center", color: "#4b5563" }}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" style={{ color: "#6366f1", textDecoration: "none" }}>Forgot Password?</a>
            </div>

            <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>Sign In</button>

            <div style={{ textAlign: "center", margin: "16px 0", color: "#9ca3af" }}>or continue with</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button type="button" className="btn" style={{ border: "2px solid #e5e7eb" }}><i className="fab fa-google" /> Google</button>
              <button type="button" className="btn" style={{ border: "2px solid #e5e7eb" }}><i className="fab fa-github" /> GitHub</button>
            </div>
          </form>

          <div className="login-footer" style={{ textAlign: "center", marginTop: 16 }}>
            <p>Don't have an account? <a href="#" style={{ color: "#6366f1" }}>Sign up</a></p>
          </div>
        </div>
      </div>
    </main>
  );
}

