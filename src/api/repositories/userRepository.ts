import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  return await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });
};

export const getAllUsers = async (
  page: number,
  limit: number
): Promise<{ users: User[]; total: number }> => {
  const offset = (page - 1) * limit;
  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      skip: offset,
      take: limit,
    }),
    prisma.user.count(),
  ]);

  return { users, total };
};

export const findUserById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (
  id: number,
  data: {
    email?: string;
    password?: string;
    name?: string;
  }
): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number): Promise<User> => {
  return await prisma.user.delete({ where: { id } });
};
