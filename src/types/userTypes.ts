export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  role?: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface UpdateUserInput {
  email?: string;
  password?: string;
  name?: string;
}
