import { NextFunction, Request, Response } from "express";
import { CreateUserInput, UpdateUserInput } from "../../types/userTypes";
import {
  getUserByIdService,
  modifyUserService,
  registerUserService,
  removeUserService,
  getUserByEmailService,
  getAllUsersService,
  registerAdminService,
} from "../services/userService";
import { sendSuccessResponse } from "../../utils/successResponse";
import { sendErrorResponse } from "../../utils/errorResponse";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const input: CreateUserInput = req.body;
    const user = await registerUserService(input);

    sendSuccessResponse(res, "User created successfully", user, 201);
  } catch (error: Error | any) {
    if (error.message === "User already exists") {
      sendErrorResponse(res, "User already exists", 409);
    } else {
      next(error);
    }
  }
};

export const createAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const input: CreateUserInput = req.body;
    const admin = await registerAdminService(input);

    sendSuccessResponse(res, "Admin created successfully", admin, 201);
  } catch (error: Error | any) {
    if (error.message === "User already exists") {
      sendErrorResponse(res, "User already exists", 409);
    } else {
      next(error);
    }
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      sendErrorResponse(res, "Invalid page or limit", 400);
      return;
    }

    const { users, total } = await getAllUsersService(page, limit);

    const totalPages = Math.ceil(total / limit);

    if (users.length === 0) {
      sendErrorResponse(res, "No users found", 404);
      return;
    }

    sendSuccessResponse(res, "Users retrieved successfully", {
      users,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(Number(id));
    if (!user) {
      sendErrorResponse(res, "User not found", 404);
      return;
    }

    sendSuccessResponse(res, "User retrieved successfully", user);
  } catch (error) {
    next(error);
  }
};

export const getUserByEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.query;

    if (!email) {
      sendErrorResponse(res, "Email is required", 400);
      return;
    }

    const user = await getUserByEmailService(email as string);
    if (!user) {
      sendErrorResponse(res, "User not found", 404);
      return;
    }

    sendSuccessResponse(res, "User retrieved successfully", user);
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const input: UpdateUserInput = req.body;
    const user = await modifyUserService(Number(id), input);
    if (!user) {
      sendErrorResponse(res, "User not found", 404);
      return;
    }

    sendSuccessResponse(res, "User updated successfully", user);
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await removeUserService(Number(id));
    if (!user) {
      sendErrorResponse(res, "User not found", 404);
      return;
    }

    sendSuccessResponse(res, "User deleted successfully", user);
  } catch (error) {
    next(error);
  }
};
