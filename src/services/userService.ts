import bcrypt from "bcrypt";
import { CreateUserInput, UpdateUserInput, User } from "../types/userTypes";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
} from "../repositories/userRepository";

export const registerUser = async (input: CreateUserInput): Promise<User> => {
  const existingUser = await findUserByEmail(input.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  return await createUser(input.email, hashedPassword, input.name);
};

export const getUserById = async (id: number): Promise<User | null> => {
  return await findUserById(id);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await findUserByEmail(email);
};

export const modifyUser = async (
  id: number,
  input: UpdateUserInput
): Promise<User> => {
  if (input.password) {
    input.password = await bcrypt.hash(input.password, 10);
  }

  return await updateUser(id, input);
};

export const removeUser = async (id: number): Promise<User> => {
  return await deleteUser(id);
};
