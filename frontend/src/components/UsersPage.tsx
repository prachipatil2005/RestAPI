/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-hot-toast";
import type { User, UserFormData } from "../types/user";
import { userApi } from "../services/userApi";
import { UserForm } from "./UserForm";

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const data = await userApi.getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (userData: UserFormData) => {
    try {
      await userApi.createUser(userData);
      toast.success("User created successfully");
      setOpenForm(false);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  const handleUpdateUser = async (userData: UserFormData) => {
    if (!editUser?._id) return;
    try {
      await userApi.updateUser(editUser._id, userData);
      toast.success("User updated successfully");
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await userApi.deleteUser(id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenForm(true)}
        sx={{ mb: 3 }}
      >
        Add New User
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => setEditUser(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => user._id && handleDeleteUser(user._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UserForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleCreateUser}
        title="Add New User"
      />

      <UserForm
        open={!!editUser}
        onClose={() => setEditUser(null)}
        onSubmit={handleUpdateUser}
        initialData={editUser || undefined}
        title="Edit User"
      />
    </Container>
  );
};
