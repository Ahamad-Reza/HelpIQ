import { useState } from "react";
import {
  Users as UsersIcon,
  UserPlus,
  Search,
  MoreVertical,
  ShieldCheck,
  UserCheck,
  UserX,
  ChevronDown,
} from "lucide-react";

import "./Users.css";

const users = [
  {
    id: 1,
    name: "Ahamad Reza",
    email: "ahamad@helpiq.com",
    role: "Admin",
    status: "Active",
    department: "IT",
  },
  {
    id: 2,
    name: "Sarah Khan",
    email: "sarah@helpiq.com",
    role: "Support",
    status: "Active",
    department: "IT Support",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@helpiq.com",
    role: "User",
    status: "Active",
    department: "Finance",
  },
  {
    id: 4,
    name: "Priya Shah",
    email: "priya@helpiq.com",
    role: "Support",
    status: "Inactive",
    department: "IT Support",
  },
  {
    id: 5,
    name: "Mike Wilson",
    email: "mike@helpiq.com",
    role: "User",
    status: "Active",
    department: "Marketing",
  },
  {
    id: 6,
    name: "David Lee",
    email: "david@helpiq.com",
    role: "User",
    status: "Active",
    department: "Operations",
  },
];

function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.department.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const adminUsers = users.filter(
    (user) => user.role === "Admin"
  ).length;

  return (
    <main className="users-page">

      {/* HEADER */}

      <section className="users-header">

        <div>
          <div className="users-eyebrow">
            <UsersIcon size={15} />
            USER MANAGEMENT
          </div>

          <h1>Users</h1>

          <p>
            Manage users, roles and access permissions.
          </p>
        </div>

        <button className="add-user-button">
          <UserPlus size={18} />
          Add User
        </button>

      </section>


      {/* STATISTICS */}

      <section className="users-stats">

        <div className="user-stat-card">

          <div className="user-stat-icon blue">
            <UsersIcon size={21} />
          </div>

          <div>
            <span>Total Users</span>
            <strong>{users.length}</strong>
          </div>

        </div>


        <div className="user-stat-card">

          <div className="user-stat-icon green">
            <UserCheck size={21} />
          </div>

          <div>
            <span>Active Users</span>
            <strong>{activeUsers}</strong>
          </div>

        </div>


        <div className="user-stat-card">

          <div className="user-stat-icon orange">
            <UserX size={21} />
          </div>

          <div>
            <span>Inactive Users</span>
            <strong>{inactiveUsers}</strong>
          </div>

        </div>


        <div className="user-stat-card">

          <div className="user-stat-icon purple">
            <ShieldCheck size={21} />
          </div>

          <div>
            <span>Administrators</span>
            <strong>{adminUsers}</strong>
          </div>

        </div>

      </section>


      {/* USER TABLE */}

      <section className="users-panel">

        <div className="users-toolbar">

          <div className="user-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <div className="role-filter">

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Support">Support</option>
              <option value="User">User</option>
            </select>

            <ChevronDown size={16} />

          </div>

        </div>


        <div className="users-table-wrapper">

          <table className="users-table">

            <thead>
              <tr>
                <th>USER</th>
                <th>DEPARTMENT</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>


            <tbody>

              {filteredUsers.map((user) => (

                <tr key={user.id}>

                  <td>

                    <div className="user-info">

                      <div className="user-avatar">
                        {user.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>

                    </div>

                  </td>


                  <td>
                    <span className="department">
                      {user.department}
                    </span>
                  </td>


                  <td>

                    <span
                      className={`role-badge ${user.role.toLowerCase()}`}
                    >
                      {user.role}
                    </span>

                  </td>


                  <td>

                    <span
                      className={`status-badge ${user.status.toLowerCase()}`}
                    >
                      <i></i>
                      {user.status}
                    </span>

                  </td>


                  <td>

                    <button
                      className="user-action"
                      type="button"
                      aria-label={`Actions for ${user.name}`}
                    >
                      <MoreVertical size={18} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {filteredUsers.length === 0 && (

            <div className="users-empty">

              <Search size={30} />

              <h3>No users found</h3>

              <p>
                Try searching with another name or email.
              </p>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Users;
