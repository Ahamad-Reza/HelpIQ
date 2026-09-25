import { useState } from "react";
import "./App.css";

import Login from "./Login";
import AICopilot from "./AICopilot";
import KnowledgeBase from "./KnowledgeBase";
import UsersPage from "./Users";
import SystemHealth from "./SystemHealth";
import Reports from "./Reports";
import SettingsPage from "./Settings";
import AuditLogs from "./AuditLogs";
import Tickets from "./Tickets";

import aiImage from "./ChatGPT Image.png";

import {
  Home,
  Ticket,
  Sparkles,
  BookOpen,
  Users,
  Activity,
  BarChart3,
  Settings,
  ClipboardList,
  Search,
  Bell,
  HelpCircle,
  Sun,
  ChevronDown,
  CalendarDays,
  Menu,
  Clock3,
  UserRound,
} from "lucide-react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  /* ================= LOGIN ================= */

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
      />
    );
  }

  /* ================= MAIN APP ================= */

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="sidebar-brand">

          <div className="sidebar-brand-icon">
            Z
          </div>

          <div className="sidebar-brand-text">
            <strong>
              Zypher
            </strong>

            <span>
              AI IT Helpdesk
            </span>
          </div>

        </div>

        <nav className="sidebar-nav">

          {/* ================= OVERVIEW ================= */}

          <div className="nav-group">

            <p className="nav-label">
              OVERVIEW
            </p>

            <button
              className={`sidebar-item ${
                activePage === "dashboard" ? "active" : ""
              }`}
              onClick={() => setActivePage("dashboard")}
            >
              <Home size={18} />

              <span>
                Dashboard
              </span>
            </button>

          </div>

          {/* ================= SUPPORT ================= */}

          <div className="nav-group">

            <p className="nav-label">
              SUPPORT
            </p>

            {/* Tickets */}

            <button
              className={`sidebar-item ${
                activePage === "tickets" ? "active" : ""
              }`}
              onClick={() => setActivePage("tickets")}
            >
              <Ticket size={18} />

              <span>
                Tickets
              </span>

              <b>
                12
              </b>
            </button>

            {/* AI Copilot */}

            <button
              className={`sidebar-item ${
                activePage === "copilot" ? "active" : ""
              }`}
              onClick={() => setActivePage("copilot")}
            >
              <Sparkles size={18} />

              <span>
                AI Copilot
              </span>
            </button>

            {/* Knowledge Base */}

            <button
              className={`sidebar-item ${
                activePage === "knowledge" ? "active" : ""
              }`}
              onClick={() => setActivePage("knowledge")}
            >
              <BookOpen size={18} />

              <span>
                Knowledge Base
              </span>
            </button>

          </div>

          {/* ================= MANAGEMENT ================= */}

          <div className="nav-group">

            <p className="nav-label">
              MANAGEMENT
            </p>

            {/* Users */}

            <button
              className={`sidebar-item ${
                activePage === "users" ? "active" : ""
              }`}
              onClick={() => setActivePage("users")}
            >
              <Users size={18} />

              <span>
                Users
              </span>
            </button>

            {/* System Health */}

            <button
              className={`sidebar-item ${
                activePage === "system-health" ? "active" : ""
              }`}
              onClick={() => setActivePage("system-health")}
            >
              <Activity size={18} />

              <span>
                System Health
              </span>
            </button>

            {/* Reports */}

            <button
              className={`sidebar-item ${
                activePage === "reports" ? "active" : ""
              }`}
              onClick={() => setActivePage("reports")}
            >
              <BarChart3 size={18} />

              <span>
                Reports
              </span>
            </button>

          </div>

          {/* ================= SYSTEM ================= */}

          <div className="nav-group">

            <p className="nav-label">
              SYSTEM
            </p>

            {/* Settings */}

            <button
              className={`sidebar-item ${
                activePage === "settings" ? "active" : ""
              }`}
              onClick={() => setActivePage("settings")}
            >
              <Settings size={18} />

              <span>
                Settings
              </span>
            </button>

            {/* Audit Logs */}

            <button
              className={`sidebar-item ${
                activePage === "audit-logs" ? "active" : ""
              }`}
              onClick={() => setActivePage("audit-logs")}
            >
              <ClipboardList size={18} />

              <span>
                Audit Logs
              </span>
            </button>

          </div>

        </nav>

        {/* ================= SIDEBAR HELP ================= */}

        <div className="sidebar-bottom">

          <div className="sidebar-help">

            <div className="help-icon">
              ?
            </div>

            <div>

              <strong>
                Need help?
              </strong>

              <span>
                Contact support
              </span>

            </div>

          </div>

        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <div className="main-content">

        {/* ================= HEADER ================= */}

        <header className="main-header">

          <button
            className="mobile-menu"
            type="button"
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          {/* Brand */}

          <div className="brand">

            <div className="brand-icon">
              Z
            </div>

            <div className="brand-text">

              <h2>
                Zypher
              </h2>

              <span>
                AI IT Helpdesk
              </span>

            </div>

          </div>

          {/* Search */}

          <div className="header-center">

            <div className="search-box">

              <Search
                className="search-icon"
                size={18}
              />

              <input
                type="text"
                placeholder="Search tickets, users, knowledge..."
              />

              <span className="search-shortcut">
                ⌘ K
              </span>

            </div>

          </div>

          {/* Header Right */}

          <div className="header-right">

            <button
              className="header-action"
              type="button"
            >
              <HelpCircle size={19} />
            </button>

            <button
              className="header-action notification"
              type="button"
            >
              <Bell size={18} />

              <span className="notification-badge">
                3
              </span>
            </button>

            <button
              className="header-action theme-button"
              type="button"
            >
              <Sun size={18} />
            </button>

            {/* Profile */}

            <div className="profile">

              <div className="avatar">
                AR
              </div>

              <div className="profile-info">

                <strong>
                  Ahamad Reza
                </strong>

                <span>
                  Creator · Admin
                </span>

              </div>

              <ChevronDown
                className="profile-arrow"
                size={16}
              />

            </div>

          </div>

        </header>

        {/* =====================================================
            DASHBOARD
        ===================================================== */}

        {activePage === "dashboard" && (

          <main className="dashboard-area">

            {/* ================= HERO ================= */}

            <section className="hero">

              <div className="hero-content">

                <div className="eyebrow">

                  <Sparkles size={14} />

                  CREATOR DASHBOARD

                </div>

                <h1>

                  Good morning,

                  <span>
                    {" "}Ahamad
                  </span>

                  <span className="wave">
                    👋
                  </span>

                </h1>

                <p>
                  Monitor your IT support operations and
                  AI-assisted workflows.
                </p>

              </div>

              <div className="hero-right">

                {/* Date Card */}

                <div className="date-card">

                  <div className="date-icon">
                    <CalendarDays size={20} />
                  </div>

                  <div>

                    <span>
                      Today
                    </span>

                    <strong>
                      September 24, 2026
                    </strong>

                  </div>

                </div>

                {/* AI IMAGE */}

                <div className="agent-image-card">

                  <img
                    src={aiImage}
                    alt="AI IT Helpdesk Agent"
                  />

                </div>

              </div>

            </section>

            {/* ================= DASHBOARD CARDS ================= */}

            <section className="dashboard-cards">

              {/* Total Tickets */}

              <div className="dashboard-card">

                <div className="card-icon blue">
                  <Ticket size={22} />
                </div>

                <span>
                  Total Tickets
                </span>

                <strong>
                  128
                </strong>

                <small>
                  All support requests
                </small>

              </div>

              {/* Open Tickets */}

              <div className="dashboard-card">

                <div className="card-icon purple">
                  <Clock3 size={22} />
                </div>

                <span>
                  Open Tickets
                </span>

                <strong>
                  24
                </strong>

                <small>
                  Need attention
                </small>

              </div>

              {/* AI Resolved */}

              <div className="dashboard-card">

                <div className="card-icon green">
                  <Sparkles size={22} />
                </div>

                <span>
                  AI Resolved
                </span>

                <strong>
                  86%
                </strong>

                <small>
                  Resolved automatically
                </small>

              </div>

              {/* Active Users */}

              <div className="dashboard-card">

                <div className="card-icon orange">
                  <UserRound size={22} />
                </div>

                <span>
                  Active Users
                </span>

                <strong>
                  342
                </strong>

                <small>
                  Currently active
                </small>

              </div>

            </section>

            {/* ================= TRENDS + QUICK ACTIONS ================= */}

            <section className="ticket-main-grid">

              {/* Ticket Trends */}

              <div className="ticket-panel trend-panel">

                <div className="panel-header">

                  <div>

                    <h2>
                      Ticket Trends
                    </h2>

                    <p>
                      Support activity over the last 7 days
                    </p>

                  </div>

                  <select>

                    <option>
                      Last 7 days
                    </option>

                    <option>
                      Last 30 days
                    </option>

                  </select>

                </div>

                <div className="trend-chart">

                  <div className="chart-line line-one"></div>
                  <div className="chart-line line-two"></div>
                  <div className="chart-line line-three"></div>

                  <div className="chart-labels">

                    <span>Sep 18</span>
                    <span>Sep 19</span>
                    <span>Sep 20</span>
                    <span>Sep 21</span>
                    <span>Sep 22</span>
                    <span>Sep 23</span>

                  </div>

                </div>

                <div className="chart-legend">

                  <span>
                    <i className="legend-blue"></i>
                    Created
                  </span>

                  <span>
                    <i className="legend-green"></i>
                    Resolved
                  </span>

                  <span>
                    <i className="legend-orange"></i>
                    Open
                  </span>

                </div>

              </div>

              {/* Quick Actions */}

              <div className="ticket-panel quick-panel">

                <div className="panel-header">

                  <div>

                    <h2>
                      Quick Actions
                    </h2>

                    <p>
                      Common support tasks
                    </p>

                  </div>

                </div>

                <div className="quick-actions">

                  <button
                    className="quick-action blue"
                    onClick={() => setActivePage("tickets")}
                  >
                    <Ticket size={20} />

                    <span>
                      New Ticket
                    </span>

                  </button>

                  <button
                    className="quick-action purple"
                    onClick={() => setActivePage("users")}
                  >
                    <Users size={20} />

                    <span>
                      New User
                    </span>

                  </button>

                  <button
                    className="quick-action green"
                    onClick={() => setActivePage("knowledge")}
                  >
                    <BookOpen size={20} />

                    <span>
                      Knowledge Base
                    </span>

                  </button>

                  <button
                    className="quick-action orange"
                    onClick={() => setActivePage("system-health")}
                  >
                    <Activity size={20} />

                    <span>
                      System Check
                    </span>

                  </button>

                </div>

              </div>

            </section>

            {/* ================= RECENT TICKETS ================= */}

            <section className="ticket-panel ticket-list-panel">

              <div className="panel-header">

                <div>

                  <h2>
                    Recent Tickets
                  </h2>

                  <p>
                    Latest support requests
                  </p>

                </div>

                <button
                  className="view-all-btn"
                  onClick={() => setActivePage("tickets")}
                >
                  View All
                </button>

              </div>

              <div className="ticket-table">

                <div className="ticket-table-head">

                  <span>ID</span>
                  <span>Subject</span>
                  <span>Priority</span>
                  <span>Status</span>
                  <span>Assigned</span>
                  <span>Created</span>

                </div>

                {/* Ticket 482 */}

                <div className="ticket-row">

                  <span>#482</span>

                  <strong>
                    Network issue
                  </strong>

                  <span className="priority high">
                    High
                  </span>

                  <span className="status open">
                    Open
                  </span>

                  <span>
                    John Doe
                  </span>

                  <span>
                    10m ago
                  </span>

                </div>

                {/* Ticket 481 */}

                <div className="ticket-row">

                  <span>#481</span>

                  <strong>
                    Email not working
                  </strong>

                  <span className="priority medium">
                    Medium
                  </span>

                  <span className="status progress">
                    In Progress
                  </span>

                  <span>
                    Sarah Khan
                  </span>

                  <span>
                    32m ago
                  </span>

                </div>

                {/* Ticket 480 */}

                <div className="ticket-row">

                  <span>#480</span>

                  <strong>
                    Software installation
                  </strong>

                  <span className="priority low">
                    Low
                  </span>

                  <span className="status open">
                    Open
                  </span>

                  <span>
                    Mike Wilson
                  </span>

                  <span>
                    1h ago
                  </span>

                </div>

                {/* Ticket 479 */}

                <div className="ticket-row">

                  <span>#479</span>

                  <strong>
                    System running slow
                  </strong>

                  <span className="priority high">
                    High
                  </span>

                  <span className="status progress">
                    In Progress
                  </span>

                  <span>
                    Priya Shah
                  </span>

                  <span>
                    2h ago
                  </span>

                </div>

                {/* Ticket 478 */}

                <div className="ticket-row">

                  <span>#478</span>

                  <strong>
                    Printer not working
                  </strong>

                  <span className="priority medium">
                    Medium
                  </span>

                  <span className="status resolved">
                    Resolved
                  </span>

                  <span>
                    David Lee
                  </span>

                  <span>
                    3h ago
                  </span>

                </div>

              </div>

            </section>

          </main>

        )}

        {/* =====================================================
            TICKETS PAGE
        ===================================================== */}

        {activePage === "tickets" && (
          <Tickets />
        )}

        {/* ================= OTHER PAGES ================= */}

        {activePage === "copilot" && (
          <AICopilot />
        )}

        {activePage === "knowledge" && (
          <KnowledgeBase />
        )}

        {activePage === "users" && (
          <UsersPage />
        )}

        {activePage === "system-health" && (
          <SystemHealth />
        )}

        {activePage === "reports" && (
          <Reports />
        )}

        {activePage === "settings" && (
          <SettingsPage />
        )}

        {activePage === "audit-logs" && (
          <AuditLogs />
        )}

      </div>

    </div>
  );
}

export default App;