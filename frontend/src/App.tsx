import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import FilterForm from "./FilterForm";
import type { User } from "./types.ts";

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
        ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v)),
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
        setError(errData.message || "Error");
        throw new Error(errData.message || "Error");
      }
      setForm({ name: "", email: "", address: "" });
      setEditingId(null);
      fetchUsers();
      setError(
        editingId ? "User updated successfully" : "User added successfully"
      );
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
        setError(errData.message || "Error");
        throw new Error(errData.message || "Error");
      }
      fetchUsers();
      setError("User deleted successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <div className="container">
      <h1>User CRUD</h1>
      <UserForm
        form={form}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => {
          setEditingId(null);
          setForm({ name: "", email: "", address: "" });
        }}
      />
      <FilterForm filters={filters} onChange={handleFilterChange} />
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div style={{ textAlign: "center", minHeight: 200 }}>Loading...</div>
      ) : (
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 16,
          gap: 16,
        }}
      >
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
