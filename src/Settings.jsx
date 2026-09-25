import { useState } from "react";
import {
  Settings as SettingsIcon,
  Building2,
  UserRound,
  Bell,
  Sparkles,
  Globe2,
  Mail,
  Clock3,
  ShieldCheck,
  Save,
  RotateCcw,
  CheckCircle2,
  Pencil,
} from "lucide-react";

import "./Settings.css";

function Settings() {
  const [activeSection, setActiveSection] = useState("general");

  const [settings, setSettings] = useState({
    emailNotifications: true,
    ticketUpdates: true,
    newTicketAlerts: true,
    systemAlerts: true,
    aiCopilot: true,
    autoSuggestions: true,
    responseStyle: "Professional",
    workspaceName: "HelpiQ IT Helpdesk",
    workspaceEmail: "support@helpiq.com",
    timezone: "India Standard Time",
    language: "English",
  });

  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const cancelChanges = () => {
    setSettings({
      emailNotifications: true,
      ticketUpdates: true,
      newTicketAlerts: true,
      systemAlerts: true,
      aiCopilot: true,
      autoSuggestions: true,
      responseStyle: "Professional",
      workspaceName: "HelpiQ IT Helpdesk",
      workspaceEmail: "support@helpiq.com",
      timezone: "India Standard Time",
      language: "English",
    });

    setSaved(false);
  };

  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      className={`settings-toggle ${checked ? "active" : ""}`}
      onClick={() => onChange(!checked)}
      aria-label={checked ? "Disable setting" : "Enable setting"}
    >
      <span></span>
    </button>
  );

  return (
    <main className="settings-page">

      {/* ================= HEADER ================= */}

      <section className="settings-header">

        <div>
          <div className="settings-eyebrow">
            <SettingsIcon size={15} />
            SYSTEM SETTINGS
          </div>

          <h1>Settings</h1>

          <p>
            Manage your account, workspace and preferences.
          </p>
        </div>

        <div className="settings-header-actions">

          {saved && (
            <div className="save-success">
              <CheckCircle2 size={16} />
              Changes saved
            </div>
          )}

          <button
            className="settings-cancel"
            type="button"
            onClick={cancelChanges}
          >
            <RotateCcw size={16} />
            Cancel
          </button>

          <button
            className="settings-save"
            type="button"
            onClick={saveSettings}
          >
            <Save size={16} />
            Save Changes
          </button>

        </div>

      </section>


      {/* ================= SETTINGS LAYOUT ================= */}

      <section className="settings-layout">

        {/* ================= SIDEBAR ================= */}

        <aside className="settings-menu">

          <div className="settings-menu-title">
            SETTINGS
          </div>


          <button
            className={`settings-menu-item ${
              activeSection === "general" ? "active" : ""
            }`}
            onClick={() => setActiveSection("general")}
          >
            <Building2 size={18} />
            <span>General</span>
          </button>


          <button
            className={`settings-menu-item ${
              activeSection === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveSection("profile")}
          >
            <UserRound size={18} />
            <span>Profile</span>
          </button>


          <button
            className={`settings-menu-item ${
              activeSection === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveSection("notifications")}
          >
            <Bell size={18} />
            <span>Notifications</span>
          </button>


          <button
            className={`settings-menu-item ${
              activeSection === "ai" ? "active" : ""
            }`}
            onClick={() => setActiveSection("ai")}
          >
            <Sparkles size={18} />
            <span>AI Copilot</span>
          </button>


          <div className="settings-menu-divider"></div>


          <div className="settings-menu-help">
            <ShieldCheck size={17} />

            <div>
              <strong>Admin Settings</strong>
              <span>
                Changes apply to your workspace.
              </span>
            </div>
          </div>

        </aside>


        {/* ================= CONTENT ================= */}

        <div className="settings-content">


          {/* ================= GENERAL ================= */}

          {activeSection === "general" && (

            <section className="settings-card">

              <div className="settings-card-header">

                <div className="settings-section-icon purple">
                  <Building2 size={19} />
                </div>

                <div>
                  <h2>General Settings</h2>
                  <p>
                    Configure your HelpiQ workspace.
                  </p>
                </div>

              </div>


              <div className="settings-form">

                <div className="settings-field full">

                  <label>Workspace Name</label>

                  <input
                    value={settings.workspaceName}
                    onChange={(e) =>
                      updateSetting(
                        "workspaceName",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="settings-field">

                  <label>Workspace Email</label>

                  <div className="input-with-icon">
                    <Mail size={16} />

                    <input
                      value={settings.workspaceEmail}
                      onChange={(e) =>
                        updateSetting(
                          "workspaceEmail",
                          e.target.value
                        )
                      }
                    />
                  </div>

                </div>


                <div className="settings-field">

                  <label>Time Zone</label>

                  <div className="input-with-icon">
                    <Clock3 size={16} />

                    <select
                      value={settings.timezone}
                      onChange={(e) =>
                        updateSetting(
                          "timezone",
                          e.target.value
                        )
                      }
                    >
                      <option>
                        India Standard Time
                      </option>

                      <option>
                        UTC
                      </option>

                      <option>
                        Eastern Time
                      </option>

                      <option>
                        Pacific Time
                      </option>
                    </select>
                  </div>

                </div>


                <div className="settings-field">

                  <label>Language</label>

                  <div className="input-with-icon">
                    <Globe2 size={16} />

                    <select
                      value={settings.language}
                      onChange={(e) =>
                        updateSetting(
                          "language",
                          e.target.value
                        )
                      }
                    >
                      <option>English</option>
                      <option>Hindi</option>
                    </select>
                  </div>

                </div>

              </div>

            </section>

          )}


          {/* ================= PROFILE ================= */}

          {activeSection === "profile" && (

            <section className="settings-card">

              <div className="settings-card-header">

                <div className="settings-section-icon blue">
                  <UserRound size={19} />
                </div>

                <div>
                  <h2>Profile</h2>
                  <p>
                    Manage your personal account information.
                  </p>
                </div>

              </div>


              <div className="profile-settings">

                <div className="large-avatar">
                  AR
                </div>

                <div className="profile-details">

                  <h3>Ahamad Reza</h3>

                  <p>
                    ahamad@helpiq.com
                  </p>

                  <div className="profile-tags">

                    <span>
                      Creator
                    </span>

                    <span>
                      Admin
                    </span>

                  </div>

                </div>

                <button className="edit-profile-btn">
                  <Pencil size={15} />
                  Edit Profile
                </button>

              </div>


              <div className="profile-info-grid">

                <div>
                  <span>Full Name</span>
                  <strong>Ahamad Reza</strong>
                </div>

                <div>
                  <span>Email Address</span>
                  <strong>ahamad@helpiq.com</strong>
                </div>

                <div>
                  <span>Role</span>
                  <strong>Creator · Admin</strong>
                </div>

                <div>
                  <span>Account Status</span>
                  <strong className="status-active">
                    Active
                  </strong>
                </div>

              </div>

            </section>

          )}


          {/* ================= NOTIFICATIONS ================= */}

          {activeSection === "notifications" && (

            <section className="settings-card">

              <div className="settings-card-header">

                <div className="settings-section-icon orange">
                  <Bell size={19} />
                </div>

                <div>
                  <h2>Notifications</h2>
                  <p>
                    Choose which alerts you want to receive.
                  </p>
                </div>

              </div>


              <div className="settings-options">

                <div className="settings-option">

                  <div>
                    <strong>Email Notifications</strong>
                    <span>
                      Receive important updates by email.
                    </span>
                  </div>

                  <Toggle
                    checked={settings.emailNotifications}
                    onChange={(value) =>
                      updateSetting(
                        "emailNotifications",
                        value
                      )
                    }
                  />

                </div>


                <div className="settings-option">

                  <div>
                    <strong>Ticket Updates</strong>
                    <span>
                      Get notified when ticket status changes.
                    </span>
                  </div>

                  <Toggle
                    checked={settings.ticketUpdates}
                    onChange={(value) =>
                      updateSetting(
                        "ticketUpdates",
                        value
                      )
                    }
                  />

                </div>


                <div className="settings-option">

                  <div>
                    <strong>New Ticket Alerts</strong>
                    <span>
                      Receive alerts when a new ticket is created.
                    </span>
                  </div>

                  <Toggle
                    checked={settings.newTicketAlerts}
                    onChange={(value) =>
                      updateSetting(
                        "newTicketAlerts",
                        value
                      )
                    }
                  />

                </div>


                <div className="settings-option">

                  <div>
                    <strong>System Health Alerts</strong>
                    <span>
                      Get notified about system issues.
                    </span>
                  </div>

                  <Toggle
                    checked={settings.systemAlerts}
                    onChange={(value) =>
                      updateSetting(
                        "systemAlerts",
                        value
                      )
                    }
                  />

                </div>

              </div>

            </section>

          )}


          {/* ================= AI COPILOT ================= */}

          {activeSection === "ai" && (

            <section className="settings-card">

              <div className="settings-card-header">

                <div className="settings-section-icon purple">
                  <Sparkles size={19} />
                </div>

                <div>
                  <h2>AI Copilot</h2>
                  <p>
                    Configure AI assistance for your IT helpdesk.
                  </p>
                </div>

              </div>


              <div className="settings-options">

                <div className="settings-option">

                  <div>
                    <strong>AI Copilot</strong>
                    <span>
                      Enable AI-powered IT support assistance.
                    </span>
                  </div>

                  <Toggle
                    checked={settings.aiCopilot}
                    onChange={(value) =>
                      updateSetting(
                        "aiCopilot",
                        value
                      )
                    }
                  />

                </div>


                <div className="settings-option">

                  <div>
                    <strong>Auto Suggestions</strong>
                    <span>
                      Let AI suggest solutions while handling tickets.
                    </span>
                  </div>

                  <Toggle
                    checked={settings.autoSuggestions}
                    onChange={(value) =>
                      updateSetting(
                        "autoSuggestions",
                        value
                      )
                    }
                  />

                </div>


                <div className="settings-option">

                  <div>
                    <strong>Response Style</strong>
                    <span>
                      Choose how AI responses should sound.
                    </span>
                  </div>

                  <select
                    className="response-select"
                    value={settings.responseStyle}
                    onChange={(e) =>
                      updateSetting(
                        "responseStyle",
                        e.target.value
                      )
                    }
                  >
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Concise</option>
                  </select>

                </div>

              </div>


              <div className="ai-status-card">

                <div className="ai-status-icon">
                  <Sparkles size={18} />
                </div>

                <div>
                  <strong>AI Copilot is ready</strong>
                  <span>
                    Your AI assistant is configured and available.
                  </span>
                </div>

                <div className="ai-status-badge">
                  <i></i>
                  Enabled
                </div>

              </div>

            </section>

          )}

        </div>

      </section>

    </main>
  );
}

export default Settings;