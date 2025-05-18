import { useEffect, useState } from "react";
import "./App.css";

interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
}

const API_URL = "http://localhost:8000/api/user";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ name: "", email: "", address: "" });
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
      });
      const res = await fetch(`${API_URL}/getAllUsers?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
        setTotalPages(1);
      } else if (data && Array.isArray(data.users)) {
        setUsers(data.users);
        setTotalPages(data.totalPages || 1);
      } else {
        setUsers([]);
        setTotalPages(1);
      }
    } catch {
      setError("Could not fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page, filters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(
        editingId ? `${API_URL}/update/${editingId}` : `${API_URL}/create`,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error");
      }
      setForm({ name: "", email: "", address: "" });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleEdit = (user: User) => {
    setForm({ name: user.name, email: user.email, address: user.address });
    setEditingId(user._id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this user?")) return;
    setError("");
    try {
      const res = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error");
      }
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <div className="container">
      <h1>User CRUD</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={!!editingId}
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} User</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", email: "", address: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <form className="user-form">
        <input
          name="name"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          name="email"
          placeholder="Filter by Email"
          value={filters.email}
          onChange={handleFilterChange}
        />
        <input
          name="address"
          placeholder="Filter by Address"
          value={filters.address}
          onChange={handleFilterChange}
        />
      </form>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0",
            }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span style={{ margin: "0 1rem" }}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
