import { useState } from "react";
import {
  Activity,
  CheckCircle2,
  RefreshCw,
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  Server,
  Database,
  ShieldCheck,
  Bot,
  Bell,
  Clock3,
  Zap,
  AlertTriangle,
} from "lucide-react";

import "./SystemHealth.css";

const services = [
  {
    name: "API Gateway",
    description: "Core API requests",
    icon: Server,
    status: "Operational",
    response: "142 ms",
    uptime: "99.99%",
  },
  {
    name: "Database",
    description: "Data storage & queries",
    icon: Database,
    status: "Operational",
    response: "38 ms",
    uptime: "99.98%",
  },
  {
    name: "Authentication",
    description: "Login & access control",
    icon: ShieldCheck,
    status: "Operational",
    response: "91 ms",
    uptime: "99.99%",
  },
  {
    name: "AI Service",
    description: "HelpIQ AI Copilot",
    icon: Bot,
    status: "Operational",
    response: "284 ms",
    uptime: "99.95%",
  },
  {
    name: "Notifications",
    description: "Email & alerts",
    icon: Bell,
    status: "Operational",
    response: "72 ms",
    uptime: "99.97%",
  },
];

const healthChecks = [
  {
    name: "API Gateway",
    time: "12 seconds ago",
  },
  {
    name: "Database",
    time: "18 seconds ago",
  },
  {
    name: "Authentication",
    time: "21 seconds ago",
  },
  {
    name: "AI Service",
    time: "28 seconds ago",
  },
  {
    name: "Notifications",
    time: "34 seconds ago",
  },
];

function SystemHealth() {
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("12 seconds ago");

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated("just now");
    }, 1000);
  };

  return (
    <main className="system-health-page">

      {/* HEADER */}
      <section className="health-header">
        <div>
          <div className="health-eyebrow">
            <Activity size={15} />
            SYSTEM MONITORING
          </div>

          <h1>System Health</h1>

          <p>
            Monitor infrastructure, services and overall system performance.
          </p>
        </div>

        <div className="health-header-actions">
          <div className="last-updated">
            <Clock3 size={15} />
            <span>Updated {lastUpdated}</span>
          </div>

          <button
            className="refresh-health"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              size={17}
              className={refreshing ? "refresh-spin" : ""}
            />

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </section>

      {/* OVERALL STATUS */}
      <section className="overall-status">
        <div className="status-icon">
          <CheckCircle2 size={26} />
        </div>

        <div className="status-content">
          <div className="status-title">
            <h2>All Systems Operational</h2>
            <span className="operational-pill">
              <i></i>
              Operational
            </span>
          </div>

          <p>
            All monitored HelpIQ services are running normally with no
            detected issues.
          </p>
        </div>

        <div className="status-summary">
          <strong>5 / 5</strong>
          <span>Services healthy</span>
        </div>
      </section>

      {/* RESOURCE CARDS */}
      <section className="resource-grid">

        <div className="resource-card">
          <div className="resource-top">
            <div className="resource-icon cpu-icon">
              <Cpu size={20} />
            </div>

            <span className="resource-status">Normal</span>
          </div>

          <div className="resource-info">
            <span>CPU Usage</span>
            <strong>32%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: "32%" }}
            ></div>
          </div>

          <p>8 cores available</p>
        </div>

        <div className="resource-card">
          <div className="resource-top">
            <div className="resource-icon memory-icon">
              <MemoryStick size={20} />
            </div>

            <span className="resource-status">Normal</span>
          </div>

          <div className="resource-info">
            <span>Memory Usage</span>
            <strong>58%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: "58%" }}
            ></div>
          </div>

          <p>9.3 GB of 16 GB used</p>
        </div>

        <div className="resource-card">
          <div className="resource-top">
            <div className="resource-icon storage-icon">
              <HardDrive size={20} />
            </div>

            <span className="resource-status">Normal</span>
          </div>

          <div className="resource-info">
            <span>Storage Usage</span>
            <strong>41%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: "41%" }}
            ></div>
          </div>

          <p>124 GB of 300 GB used</p>
        </div>

        <div className="resource-card">
          <div className="resource-top">
            <div className="resource-icon network-icon">
              <Wifi size={20} />
            </div>

            <span className="resource-status">Stable</span>
          </div>

          <div className="resource-info">
            <span>Network</span>
            <strong>98.7%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: "98.7%" }}
            ></div>
          </div>

          <p>Network connectivity</p>
        </div>

      </section>

      {/* MAIN GRID */}
      <section className="health-main-grid">

        {/* SERVICE MONITORING */}
        <div className="health-panel service-panel">

          <div className="panel-header">
            <div>
              <h2>Service Monitoring</h2>
              <p>Current status of HelpIQ services</p>
            </div>

            <span className="service-count">
              5 / 5 Operational
            </span>
          </div>

          <div className="service-table">

            <div className="service-table-header">
              <span>SERVICE</span>
              <span>STATUS</span>
              <span>RESPONSE</span>
              <span>UPTIME</span>
            </div>

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  className="service-row"
                  key={service.name}
                >
                  <div className="service-name">
                    <div className="service-icon">
                      <Icon size={17} />
                    </div>

                    <div>
                      <strong>{service.name}</strong>
                      <span>{service.description}</span>
                    </div>
                  </div>

                  <div>
                    <span className="service-status">
                      <i></i>
                      {service.status}
                    </span>
                  </div>

                  <span className="response-time">
                    {service.response}
                  </span>

                  <span className="uptime">
                    {service.uptime}
                  </span>
                </div>
              );
            })}

          </div>
        </div>

        {/* PERFORMANCE */}
        <div className="health-panel performance-panel">

          <div className="panel-header">
            <div>
              <h2>Performance</h2>
              <p>System activity overview</p>
            </div>

            <Zap size={20} className="performance-icon" />
          </div>

          <div className="performance-stats">

            <div>
              <span>Response Time</span>
              <strong>142 ms</strong>
            </div>

            <div>
              <span>Requests</span>
              <strong>1,284</strong>
            </div>

            <div>
              <span>Error Rate</span>
              <strong>0.12%</strong>
            </div>

            <div>
              <span>Availability</span>
              <strong>99.9%</strong>
            </div>

          </div>

          <div className="chart-area">

            <div className="chart-labels">
              <span>200ms</span>
              <span>150ms</span>
              <span>100ms</span>
              <span>50ms</span>
              <span>0ms</span>
            </div>

            <div className="chart">

              <div className="chart-grid-line line-1"></div>
              <div className="chart-grid-line line-2"></div>
              <div className="chart-grid-line line-3"></div>
              <div className="chart-grid-line line-4"></div>

              <svg
                viewBox="0 0 500 180"
                preserveAspectRatio="none"
              >
                <polyline
                  points="
                    0,120
                    45,105
                    90,112
                    135,78
                    180,90
                    225,65
                    270,80
                    315,58
                    360,72
                    405,48
                    450,62
                    500,42
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <polyline
                  points="
                    0,120
                    45,105
                    90,112
                    135,78
                    180,90
                    225,65
                    270,80
                    315,58
                    360,72
                    405,48
                    450,62
                    500,42
                    500,180
                    0,180
                  "
                  className="chart-area-fill"
                />
              </svg>

            </div>

          </div>

          <div className="chart-time">
            <span>10:00</span>
            <span>10:15</span>
            <span>10:30</span>
            <span>10:45</span>
            <span>11:00</span>
          </div>

        </div>

      </section>

      {/* RECENT HEALTH CHECKS */}
      <section className="health-panel recent-panel">

        <div className="panel-header">
          <div>
            <h2>Recent Health Checks</h2>
            <p>Latest automated service checks</p>
          </div>

          <button className="view-history">
            View history
          </button>
        </div>

        <div className="health-check-list">

          {healthChecks.map((check) => (
            <div
              className="health-check-item"
              key={check.name}
            >
              <div className="check-left">
                <div className="check-icon">
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <strong>{check.name}</strong>
                  <span>Health check completed successfully</span>
                </div>
              </div>

              <span className="check-time">
                {check.time}
              </span>
            </div>
          ))}

        </div>

      </section>

      {/* FOOTER NOTE */}
      <div className="health-footer-note">
        <AlertTriangle size={15} />
        <span>
          Health metrics shown are currently based on monitoring data.
          Connect your backend services for real-time infrastructure metrics.
        </span>
      </div>

    </main>
  );
}

export default SystemHealth;