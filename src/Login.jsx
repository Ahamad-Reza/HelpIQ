import { useState } from "react";
import "./Login.css";

import {
  Sparkles,
  ShieldCheck,
  UsersRound,
  ArrowRight,
} from "lucide-react";

import aiImage from "./ChatGPT Image.png";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login:", {
      email,
      password,
    });

    // Login successful
    onLogin();
  };

  return (
    <div className="login-page">

      {/* ================= LEFT SIDE ================= */}
      <div className="login-left">

        {/* Logo */}
        <div className="login-brand">
          <div className="brand-logo">H</div>

          <div>
            <h2>HelpiQ</h2>
            <span>AI IT Helpdesk</span>
          </div>
        </div>

        {/* AI IMAGE */}
        <div className="login-illustration">
          <img
            src={aiImage}
            alt="HelpiQ AI Assistant"
          />
        </div>

        {/* Welcome */}
        <div className="welcome-content">
          <h1>Welcome Back</h1>

          <p>
            Your intelligent IT support assistant is ready
            to help you resolve issues faster.
          </p>

          {/* Benefits */}
          <div className="login-benefits">

            <div className="benefit-item">
              <div className="benefit-icon">
                <Sparkles size={19} />
              </div>

              <div>
                <strong>AI-Powered Support</strong>
                <span>
                  Get intelligent answers instantly
                </span>
              </div>
            </div>


            <div className="benefit-item">
              <div className="benefit-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <strong>Secure & Reliable</strong>
                <span>
                  Your IT environment stays protected
                </span>
              </div>
            </div>


            <div className="benefit-item">
              <div className="benefit-icon">
                <UsersRound size={19} />
              </div>

              <div>
                <strong>One Support Platform</strong>
                <span>
                  Tickets, knowledge & AI in one place
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="login-copyright">
          © 2026 HelpiQ. All rights reserved.
        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="login-right">

        <div className="login-card">

          {/* Header */}
          <div className="login-card-header">
            <h2>Sign In</h2>

            <p>
              Enter your credentials to access your account
            </p>
          </div>


          {/* Login Form */}
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>


            {/* Password */}
            <div className="form-group">

              <div className="password-label">
                <label>Password</label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot password?
                </button>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>


            {/* Sign In */}
            <button
              type="submit"
              className="signin-btn"
            >
              <span>Sign In</span>
              <ArrowRight size={18} />
            </button>

          </form>


          {/* Divider */}
          <div className="login-divider">
            <span>OR</span>
          </div>


          {/* Google */}
          <button
            type="button"
            className="google-btn"
          >
            <span className="google-icon">
              G
            </span>

            Continue with Google
          </button>


          {/* Admin Help */}
          <div className="admin-help">
            <span>Need access?</span>

            <button type="button">
              Contact Administrator
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;