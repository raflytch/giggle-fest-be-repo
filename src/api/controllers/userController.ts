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

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const input: CreateUserInput = req.body;
    const user = await registerUserService(input);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error: Error | any) {
    if (error.message === "User already exists") {
      res.status(409).json({
        success: false,
        message: "User already exists",
      });
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

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: {
        admin,
      },
    });
  } catch (error: Error | any) {
    if (error.message === "User already exists") {
      res.status(409).json({
        success: false,
        message: "User already exists",
      });
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
      res.status(400).json({
        success: false,
        message: "Invalid page or limit",
      });
      return;
    }

    const { users, total } = await getAllUsersService(page, limit);

    const totalPages = Math.ceil(total / limit);

    if (users.length === 0) {
      res.status(404).json({
        success: false,
        message: "No users found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: {
        users,
        meta: {
          page,
          limit,
          total,
          totalPages,
        },
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
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
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
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    const user = await getUserByEmailService(email as string);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
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
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
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
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
