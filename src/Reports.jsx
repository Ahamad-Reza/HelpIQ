import { useState } from "react";
import {
  BarChart3,
  CalendarDays,
  Download,
  TrendingUp,
  TrendingDown,
  Ticket,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  MoreHorizontal,
} from "lucide-react";

import "./Reports.css";

function Reports() {
  const [period, setPeriod] = useState("30 Days");

  const stats = [
    {
      title: "Total Tickets",
      value: "248",
      change: "+12.5%",
      label: "vs previous period",
      type: "up",
      icon: Ticket,
      color: "purple",
    },
    {
      title: "Resolution Rate",
      value: "84.2%",
      change: "+4.2%",
      label: "vs previous period",
      type: "up",
      icon: CheckCircle2,
      color: "green",
    },
    {
      title: "Avg. Response",
      value: "18 min",
      change: "-3 min",
      label: "vs previous period",
      type: "down",
      icon: Clock3,
      color: "blue",
    },
    {
      title: "SLA Compliance",
      value: "96.4%",
      change: "+1.8%",
      label: "vs previous period",
      type: "up",
      icon: ShieldCheck,
      color: "orange",
    },
  ];

  const trendData = [
    { day: "Mon", opened: 32, resolved: 27 },
    { day: "Tue", opened: 41, resolved: 35 },
    { day: "Wed", opened: 37, resolved: 31 },
    { day: "Thu", opened: 48, resolved: 42 },
    { day: "Fri", opened: 43, resolved: 39 },
    { day: "Sat", opened: 29, resolved: 26 },
    { day: "Sun", opened: 24, resolved: 22 },
  ];

  const maxValue = 50;

  const categories = [
    { name: "Network", value: 82 },
    { name: "Software", value: 64 },
    { name: "Hardware", value: 48 },
    { name: "Security", value: 31 },
    { name: "Access", value: 23 },
  ];

  const departments = [
    { name: "IT Support", value: 96 },
    { name: "Finance", value: 52 },
    { name: "Operations", value: 41 },
    { name: "Marketing", value: 32 },
    { name: "HR", value: 27 },
  ];

  const agents = [
    {
      name: "Sarah Khan",
      initials: "SK",
      assigned: 48,
      resolved: 42,
      response: "14m",
      sla: "98%",
    },
    {
      name: "David Lee",
      initials: "DL",
      assigned: 44,
      resolved: 38,
      response: "17m",
      sla: "96%",
    },
    {
      name: "Priya Shah",
      initials: "PS",
      assigned: 39,
      resolved: 31,
      response: "21m",
      sla: "94%",
    },
    {
      name: "Mike Wilson",
      initials: "MW",
      assigned: 35,
      resolved: 29,
      response: "19m",
      sla: "93%",
    },
  ];

  return (
    <main className="reports-page">

      {/* HEADER */}
      <section className="reports-header">
        <div>
          <div className="reports-eyebrow">
            <BarChart3 size={15} />
            ANALYTICS & REPORTING
          </div>

          <h1>Reports</h1>

          <p>
            Monitor support performance, ticket activity and service quality.
          </p>
        </div>

        <div className="reports-actions">
          <div className="date-filter">
            <CalendarDays size={17} />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option>Today</option>
              <option>7 Days</option>
              <option>30 Days</option>
              <option>3 Months</option>
              <option>12 Months</option>
            </select>
          </div>

          <button className="export-report">
            <Download size={17} />
            Export Report
          </button>
        </div>
      </section>

      {/* KPI CARDS */}
      <section className="report-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="report-stat-card" key={stat.title}>
              <div className="stat-card-top">
                <div className={`report-stat-icon ${stat.color}`}>
                  <Icon size={20} />
                </div>

                <button className="stat-more">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="stat-title">
                {stat.title}
              </div>

              <div className="stat-value">
                {stat.value}
              </div>

              <div className="stat-change">
                {stat.type === "up" ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}

                <strong className={stat.type}>
                  {stat.change}
                </strong>

                <span>{stat.label}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* MAIN CHARTS */}
      <section className="reports-grid">

        {/* TICKET TREND */}
        <div className="report-panel trend-panel">
          <div className="panel-header">
            <div>
              <h2>Ticket Volume & Resolution</h2>
              <p>Tickets opened versus resolved during this period.</p>
            </div>

            <div className="chart-legend">
              <span>
                <i className="legend-dot opened"></i>
                Opened
              </span>

              <span>
                <i className="legend-dot resolved"></i>
                Resolved
              </span>
            </div>
          </div>

          <div className="trend-chart">
            <div className="chart-y-axis">
              <span>50</span>
              <span>40</span>
              <span>30</span>
              <span>20</span>
              <span>10</span>
              <span>0</span>
            </div>

            <div className="chart-area">
              <div className="chart-grid-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="chart-bars">
                {trendData.map((item) => (
                  <div className="chart-column" key={item.day}>
                    <div className="bars">
                      <div
                        className="bar opened-bar"
                        style={{
                          height: `${(item.opened / maxValue) * 100}%`,
                        }}
                        title={`Opened: ${item.opened}`}
                      ></div>

                      <div
                        className="bar resolved-bar"
                        style={{
                          height: `${(item.resolved / maxValue) * 100}%`,
                        }}
                        title={`Resolved: ${item.resolved}`}
                      ></div>
                    </div>

                    <span className="chart-label">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TICKET STATUS */}
        <div className="report-panel status-panel">
          <div className="panel-header">
            <div>
              <h2>Ticket Status</h2>
              <p>Current ticket distribution.</p>
            </div>

            <button className="panel-menu">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="status-content">
            <div className="donut">
              <div className="donut-inner">
                <strong>248</strong>
                <span>Total</span>
              </div>
            </div>

            <div className="status-list">
              <div>
                <span>
                  <i className="status-dot resolved"></i>
                  Resolved
                </span>
                <strong>75%</strong>
              </div>

              <div>
                <span>
                  <i className="status-dot open"></i>
                  Open
                </span>
                <strong>17%</strong>
              </div>

              <div>
                <span>
                  <i className="status-dot pending"></i>
                  Pending
                </span>
                <strong>8%</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY + DEPARTMENT */}
      <section className="reports-grid second-row">

        <div className="report-panel">
          <div className="panel-header">
            <div>
              <h2>Tickets by Category</h2>
              <p>Distribution across support categories.</p>
            </div>

            <button className="panel-menu">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="horizontal-list">
            {categories.map((category) => (
              <div className="horizontal-item" key={category.name}>
                <div className="horizontal-info">
                  <span>{category.name}</span>
                  <strong>{category.value}</strong>
                </div>

                <div className="horizontal-track">
                  <div
                    className="horizontal-fill purple-fill"
                    style={{
                      width: `${(category.value / 100) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="report-panel">
          <div className="panel-header">
            <div>
              <h2>Tickets by Department</h2>
              <p>Ticket volume across departments.</p>
            </div>

            <button className="panel-menu">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="horizontal-list">
            {departments.map((department) => (
              <div className="horizontal-item" key={department.name}>
                <div className="horizontal-info">
                  <span>{department.name}</span>
                  <strong>{department.value}</strong>
                </div>

                <div className="horizontal-track">
                  <div
                    className="horizontal-fill blue-fill"
                    style={{
                      width: `${(department.value / 100) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENT PERFORMANCE */}
      <section className="report-panel agent-panel">

        <div className="panel-header">
          <div>
            <h2>Support Agent Performance</h2>
            <p>
              Performance metrics for support team members.
            </p>
          </div>

          <button className="view-all">
            View Details
          </button>
        </div>

        <div className="agent-table-wrapper">
          <table className="agent-table">
            <thead>
              <tr>
                <th>AGENT</th>
                <th>ASSIGNED</th>
                <th>RESOLVED</th>
                <th>AVG. RESPONSE</th>
                <th>SLA</th>
              </tr>
            </thead>

            <tbody>
              {agents.map((agent) => (
                <tr key={agent.name}>
                  <td>
                    <div className="agent-info">
                      <div className="agent-avatar">
                        {agent.initials}
                      </div>

                      <div>
                        <strong>{agent.name}</strong>
                        <span>Support Agent</span>
                      </div>
                    </div>
                  </td>

                  <td>{agent.assigned}</td>
                  <td>
                    <strong className="resolved-number">
                      {agent.resolved}
                    </strong>
                  </td>
                  <td>{agent.response}</td>
                  <td>
                    <span className="sla-badge">
                      {agent.sla}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="insights-panel">

        <div className="insights-title">
          <div className="insights-icon">
            <BarChart3 size={20} />
          </div>

          <div>
            <h2>Report Insights</h2>
            <p>Key observations from the selected period.</p>
          </div>
        </div>

        <div className="insights-grid">
          <div className="insight-item">
            <span className="insight-number">01</span>
            <p>
              Ticket volume increased by <strong>12.5%</strong>{" "}
              compared with the previous period.
            </p>
          </div>

          <div className="insight-item">
            <span className="insight-number">02</span>
            <p>
              <strong>Network</strong> issues represent the largest
              support category.
            </p>
          </div>

          <div className="insight-item">
            <span className="insight-number">03</span>
            <p>
              Average response time improved by{" "}
              <strong>3 minutes</strong>.
            </p>
          </div>

          <div className="insight-item">
            <span className="insight-number">04</span>
            <p>
              SLA compliance remained above{" "}
              <strong>95%</strong>.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Reports;