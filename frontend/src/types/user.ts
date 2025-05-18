export interface User {
  _id?: string;
  name: string;
  email: string;
  address: string;
}

export interface UserFormData {
  name: string;
  email: string;
  address: string;
}
