interface FilterFormProps {
  filters: { name: string; email: string; address: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterForm({ filters, onChange }: FilterFormProps) {
  return (
    <form className="user-form" style={{ marginBottom: "1.5rem" }}>
      <input
        name="name"
        placeholder="Filter by Name"
        value={filters.name}
        onChange={onChange}
      />
      <input
        name="email"
        placeholder="Filter by Email"
        value={filters.email}
        onChange={onChange}
      />
      <input
        name="address"
        placeholder="Filter by Address"
        value={filters.address}
        onChange={onChange}
      />
    </form>
  );
}
