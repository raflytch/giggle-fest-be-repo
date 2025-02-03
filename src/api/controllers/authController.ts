import { NextFunction, Request, Response } from "express";
import { loginService } from "../services/authService";
import { sendSuccessResponse } from "../../utils/successResponse";
import { sendErrorResponse } from "../../utils/errorResponse";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email, password);

    sendSuccessResponse(res, "User logged in successfully", user);
  } catch (error: Error | any) {
    if (
      error.message === "User not found" ||
      error.message === "Invalid password"
    ) {
      sendErrorResponse(res, error.message, 400);
      return;
    }
    next(error);
  }
};
