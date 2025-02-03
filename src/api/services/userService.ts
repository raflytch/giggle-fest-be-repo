import bcrypt from "bcrypt";
import { CreateUserInput, UpdateUserInput, User } from "../../types/userTypes";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../repositories/userRepository";

export const registerUserService = async (
  input: CreateUserInput
): Promise<User> => {
  const existingUser = await findUserByEmail(input.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  return await createUser(input.email, hashedPassword, input.name);
};

export const registerAdminService = async (
  input: CreateUserInput
): Promise<User> => {
  const existingUser = await findUserByEmail(input.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  return await createUser(input.email, hashedPassword, input.name, "admin");
};

export const getAllUsersService = async (
  page: number,
  limit: number
): Promise<{ users: User[]; total: number }> => {
  return await getAllUsers(page, limit);
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  return await findUserById(id);
};

export const getUserByEmailService = async (
  email: string
): Promise<User | null> => {
  return await findUserByEmail(email);
};

export const modifyUserService = async (
  id: number,
  input: UpdateUserInput
): Promise<User> => {
  if (input.password) {
    input.password = await bcrypt.hash(input.password, 10);
  }

  return await updateUser(id, input);
};

export const removeUserService = async (id: number): Promise<User> => {
  return await deleteUser(id);
};
