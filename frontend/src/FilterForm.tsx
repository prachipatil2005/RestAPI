import { Input, Stack } from "@chakra-ui/react";

interface FilterFormProps {
  filters: { name: string; email: string; address: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterForm({ filters, onChange }: FilterFormProps) {
  return (
    <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={4}>
      <Input
        name="name"
        placeholder="Filter by Name"
        value={filters.name}
        onChange={onChange}
      />
      <Input
        name="email"
        placeholder="Filter by Email"
        value={filters.email}
        onChange={onChange}
      />
      <Input
        name="address"
        placeholder="Filter by Address"
        value={filters.address}
        onChange={onChange}
      />
    </Stack>
  );
}
