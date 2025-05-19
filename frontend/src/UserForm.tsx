interface UserFormProps {
  form: { name: string; email: string; address: string };
  editingId: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function UserForm({
  form,
  editingId,
  onChange,
  onSubmit,
  onCancel,
}: UserFormProps) {
  return (
    <form className="user-form" onSubmit={onSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={onChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={onChange}
        required
        disabled={!!editingId}
      />
      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={onChange}
        required
      />
      <button type="submit">{editingId ? "Update" : "Add"} User</button>
      {editingId && (
        <button onClick={onCancel} type="button">
          Cancel
        </button>
      )}
    </form>
  );
}
