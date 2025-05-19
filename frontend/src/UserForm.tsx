import { Input, Button, Stack } from "@chakra-ui/react";

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
    <form onSubmit={onSubmit}>
      <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={4}>
        <Input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          required
        />
        <Input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
          disabled={!!editingId}
        />
        <Input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={onChange}
          required
        />
        <Button colorScheme="teal" type="submit">
          {editingId ? "Update" : "Add"} User
        </Button>
        {editingId && (
          <Button onClick={onCancel} type="button" colorScheme="gray">
            Cancel
          </Button>
        )}
      </Stack>
    </form>
  );
}
