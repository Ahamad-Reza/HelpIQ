import { useState } from "react";

import {
  ClipboardList,
  Search,
  RefreshCw,
  Download,
  Filter,
  ShieldCheck,
  UserRound,
  Ticket,
  Settings,
  LogIn,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
  Clock3,
  Activity,
} from "lucide-react";

import "./AuditLogs.css";

function AuditLogs() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("All Actions");
  const [userFilter, setUserFilter] = useState("All Users");
  const [selectedLog, setSelectedLog] = useState(null);

  const logs = [
    {
      id: "LOG-1048",
      user: "Ahamad Reza",
      email: "ahamad@helpiq.com",
      action: "Updated",
      category: "Settings",
      target: "Workspace Settings",
      status: "Success",
      time: "2 min ago",
      ip: "192.168.1.24",
    },
    {
      id: "LOG-1047",
      user: "Sarah Khan",
      email: "sarah@helpiq.com",
      action: "Updated",
      category: "Tickets",
      target: "#482 Network issue",
      status: "Success",
      time: "8 min ago",
      ip: "192.168.1.31",
    },
    {
      id: "LOG-1046",
      user: "Ahamad Reza",
      email: "ahamad@helpiq.com",
      action: "Created",
      category: "Users",
      target: "David Lee",
      status: "Success",
      time: "21 min ago",
      ip: "192.168.1.24",
    },
    {
      id: "LOG-1045",
      user: "John Doe",
      email: "john@helpiq.com",
      action: "Login",
      category: "Authentication",
      target: "Web Dashboard",
      status: "Success",
      time: "34 min ago",
      ip: "192.168.1.45",
    },
    {
      id: "LOG-1044",
      user: "Priya Shah",
      email: "priya@helpiq.com",
      action: "Exported",
      category: "Reports",
      target: "September Report",
      status: "Success",
      time: "48 min ago",
      ip: "192.168.1.52",
    },
    {
      id: "LOG-1043",
      user: "Mike Wilson",
      email: "mike@helpiq.com",
      action: "Failed Login",
      category: "Authentication",
      target: "Web Dashboard",
      status: "Failed",
      time: "1 hour ago",
      ip: "192.168.1.67",
    },
    {
      id: "LOG-1042",
      user: "Sarah Khan",
      email: "sarah@helpiq.com",
      action: "Resolved",
      category: "Tickets",
      target: "#478 Printer issue",
      status: "Success",
      time: "2 hours ago",
      ip: "192.168.1.31",
    },
    {
      id: "LOG-1041",
      user: "Ahamad Reza",
      email: "ahamad@helpiq.com",
      action: "Viewed",
      category: "System Health",
      target: "System Health",
      status: "Success",
      time: "3 hours ago",
      ip: "192.168.1.24",
    },
  ];

  const getIcon = (category) => {
    if (category === "Settings") return <Settings size={17} />;
    if (category === "Tickets") return <Ticket size={17} />;
    if (category === "Users") return <UserRound size={17} />;
    if (category === "Authentication") return <LogIn size={17} />;
    if (category === "Reports") return <FileText size={17} />;
    if (category === "System Health") return <Activity size={17} />;

    return <ClipboardList size={17} />;
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.category.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase()) ||
      log.id.toLowerCase().includes(search.toLowerCase());

    const matchesAction =
      actionFilter === "All Actions" ||
      log.category === actionFilter;

    const matchesUser =
      userFilter === "All Users" ||
      log.user === userFilter;

    return matchesSearch && matchesAction && matchesUser;
  });

  return (
    <div className="audit-page">

      {/* PAGE HEADER */}
      <div className="audit-header">
        <div>
          <div className="audit-title-row">
            <div className="audit-title-icon">
              <ClipboardList size={22} />
            </div>

            <div>
              <h1>Audit Logs</h1>
              <p>
                Track user activity, system changes and security events.
              </p>
            </div>
          </div>
        </div>

        <div className="audit-header-actions">
          <button className="audit-btn secondary">
            <RefreshCw size={16} />
            Refresh
          </button>

          <button className="audit-btn primary">
            <Download size={16} />
            Export Logs
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="audit-stats">

        <div className="audit-stat-card">
          <div className="audit-stat-icon blue">
            <ClipboardList size={20} />
          </div>

          <div>
            <span>Total Events</span>
            <strong>1,248</strong>
          </div>
        </div>

        <div className="audit-stat-card">
          <div className="audit-stat-icon purple">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Today</span>
            <strong>86</strong>
          </div>
        </div>

        <div className="audit-stat-card">
          <div className="audit-stat-icon green">
            <ShieldCheck size={20} />
          </div>

          <div>
            <span>Successful</span>
            <strong>82</strong>
          </div>
        </div>

        <div className="audit-stat-card">
          <div className="audit-stat-icon orange">
            <Activity size={20} />
          </div>

          <div>
            <span>Security Events</span>
            <strong>4</strong>
          </div>
        </div>

      </div>

      {/* FILTER BAR */}
      <div className="audit-filter-card">

        <div className="audit-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="audit-filter">
          <Filter size={16} />

          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <option>All Actions</option>
            <option>Settings</option>
            <option>Tickets</option>
            <option>Users</option>
            <option>Authentication</option>
            <option>Reports</option>
            <option>System Health</option>
          </select>
        </div>

        <div className="audit-filter">
          <UserRound size={16} />

          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
          >
            <option>All Users</option>
            <option>Ahamad Reza</option>
            <option>Sarah Khan</option>
            <option>John Doe</option>
            <option>Priya Shah</option>
            <option>Mike Wilson</option>
          </select>
        </div>

      </div>

      {/* TABLE */}
      <div className="audit-table-card">

        <div className="audit-table-header">
          <div>
            <h2>Activity Logs</h2>
            <p>
              {filteredLogs.length} events found
            </p>
          </div>

          <span className="live-status">
            <span></span>
            Live Monitoring
          </span>
        </div>

        <div className="audit-table-wrapper">

          <table className="audit-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Action</th>
                <th>Category</th>
                <th>Target</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>

              {filteredLogs.map((log) => (

                <tr
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                >

                  <td>
                    <span className="log-id">
                      {log.id}
                    </span>
                  </td>

                  <td>
                    <div className="audit-user">

                      <div className="audit-avatar">
                        {log.user
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <strong>{log.user}</strong>
                        <small>{log.email}</small>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span className="action-text">
                      {log.action}
                    </span>
                  </td>

                  <td>
                    <span className="category-badge">
                      {getIcon(log.category)}
                      {log.category}
                    </span>
                  </td>

                  <td>
                    <span className="target-text">
                      {log.target}
                    </span>
                  </td>

                  <td>

                    <span
                      className={`status-badge ${
                        log.status === "Success"
                          ? "success"
                          : "failed"
                      }`}
                    >
                      <span></span>
                      {log.status}
                    </span>

                  </td>

                  <td>
                    <span className="time-text">
                      {log.time}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredLogs.length === 0 && (
            <div className="empty-logs">
              <ClipboardList size={36} />
              <h3>No logs found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}

        </div>

        {/* PAGINATION */}
        <div className="audit-pagination">

          <span>
            Showing 1–{filteredLogs.length} of 1,248 events
          </span>

          <div className="pagination-buttons">

            <button>
              <ChevronLeft size={16} />
            </button>

            <button className="active-page">
              1
            </button>

            <button>
              2
            </button>

            <button>
              3
            </button>

            <span>...</span>

            <button>
              125
            </button>

            <button>
              <ChevronRight size={16} />
            </button>

          </div>

        </div>

      </div>

      {/* DETAIL MODAL */}
      {selectedLog && (

        <div
          className="audit-modal-overlay"
          onClick={() => setSelectedLog(null)}
        >

          <div
            className="audit-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="audit-modal-header">

              <div>
                <div className="modal-icon">
                  {getIcon(selectedLog.category)}
                </div>

                <div>
                  <h2>Audit Log Details</h2>
                  <p>{selectedLog.id}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLog(null)}
                className="modal-close"
              >
                <X size={20} />
              </button>

            </div>

            <div className="audit-detail-grid">

              <div className="detail-item">
                <span>User</span>
                <strong>{selectedLog.user}</strong>
              </div>

              <div className="detail-item">
                <span>Email</span>
                <strong>{selectedLog.email}</strong>
              </div>

              <div className="detail-item">
                <span>Action</span>
                <strong>{selectedLog.action}</strong>
              </div>

              <div className="detail-item">
                <span>Category</span>
                <strong>{selectedLog.category}</strong>
              </div>

              <div className="detail-item">
                <span>Target</span>
                <strong>{selectedLog.target}</strong>
              </div>

              <div className="detail-item">
                <span>Status</span>

                <strong
                  className={
                    selectedLog.status === "Success"
                      ? "detail-success"
                      : "detail-failed"
                  }
                >
                  {selectedLog.status}
                </strong>
              </div>

              <div className="detail-item">
                <span>Time</span>
                <strong>{selectedLog.time}</strong>
              </div>

              <div className="detail-item">
                <span>IP Address</span>
                <strong>{selectedLog.ip}</strong>
              </div>

            </div>

            <div className="audit-modal-footer">
              <button
                className="audit-btn secondary"
                onClick={() => setSelectedLog(null)}
              >
                Close
              </button>
            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AuditLogs;