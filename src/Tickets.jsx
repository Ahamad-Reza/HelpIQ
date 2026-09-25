import { useState } from "react";
import {
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./Tickets.css";

function Tickets() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [priority, setPriority] = useState("All Priority");

  const tickets = [
    {
      id: "#482",
      subject: "Network issue",
      priority: "High",
      status: "Open",
      assigned: "John Doe",
    },
    {
      id: "#481",
      subject: "Email not working",
      priority: "Medium",
      status: "In Progress",
      assigned: "Sarah Khan",
    },
    {
      id: "#480",
      subject: "Software install",
      priority: "Low",
      status: "Open",
      assigned: "Mike Wilson",
    },
    {
      id: "#479",
      subject: "System running slow",
      priority: "High",
      status: "In Progress",
      assigned: "Priya Shah",
    },
    {
      id: "#478",
      subject: "Printer not working",
      priority: "Medium",
      status: "Resolved",
      assigned: "David Lee",
    },
    {
      id: "#477",
      subject: "VPN connection issue",
      priority: "High",
      status: "Open",
      assigned: "John Doe",
    },
    {
      id: "#476",
      subject: "Password reset request",
      priority: "Low",
      status: "Resolved",
      assigned: "Sarah Khan",
    },
    {
      id: "#475",
      subject: "Laptop performance issue",
      priority: "Medium",
      status: "In Progress",
      assigned: "Mike Wilson",
    },
  ];

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase()) ||
      ticket.assigned.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All Status" || ticket.status === status;

    const matchesPriority =
      priority === "All Priority" || ticket.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <main className="tickets-page">

      {/* ================= PAGE HEADER ================= */}
      <div className="tickets-header">
        <div>
          <h1>Tickets</h1>
          <p>Manage and track all IT support requests</p>
        </div>

        <button className="create-ticket-btn">
          <Plus size={18} />
          Create Ticket
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="ticket-stats">

        <div className="ticket-stat-card">
          <span>All</span>
          <strong>128</strong>
        </div>

        <div className="ticket-stat-card">
          <span>Open</span>
          <strong>24</strong>
        </div>

        <div className="ticket-stat-card">
          <span>In Progress</span>
          <strong>18</strong>
        </div>

        <div className="ticket-stat-card">
          <span>Resolved</span>
          <strong>86</strong>
        </div>

      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="ticket-toolbar">

        <div className="ticket-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="ticket-filter">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

          <ChevronDown size={16} />
        </div>

        <div className="ticket-filter">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>All Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <ChevronDown size={16} />
        </div>

        <div className="ticket-filter">
          <select>
            <option>Sort: Newest</option>
            <option>Sort: Oldest</option>
            <option>Sort: Priority</option>
          </select>

          <ChevronDown size={16} />
        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="tickets-table-card">

        <div className="tickets-table-wrapper">

          <table className="tickets-table">

            <thead>
              <tr>
                <th>Ticket</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id}>

                  <td>
                    <span className="ticket-id">
                      {ticket.id}
                    </span>
                  </td>

                  <td>
                    <span className="ticket-subject">
                      {ticket.subject}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`priority priority-${ticket.priority
                        .toLowerCase()}`}
                    >
                      <span className="priority-dot"></span>
                      {ticket.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status status-${ticket.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td>
                    <div className="assigned-user">
                      <div className="user-avatar">
                        {ticket.assigned
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>

                      <span>{ticket.assigned}</span>
                    </div>
                  </td>

                </tr>
              ))}

              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan="5" className="no-tickets">
                    No tickets found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

        {/* ================= PAGINATION ================= */}
        <div className="ticket-pagination">

          <span>
            Showing <strong>1–10</strong> of <strong>128</strong>
          </span>

          <div className="pagination-buttons">

            <button>
              <ChevronLeft size={17} />
            </button>

            <button className="active-page">1</button>

            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>

            <button>
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Tickets;