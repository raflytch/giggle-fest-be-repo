import { NextFunction, Request, Response } from "express";
import { loginService } from "../services/authService";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email, password);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error: Error | any) {
    if (
      error.message === "User not found" ||
      error.message === "Invalid password"
    ) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
      return;
    }
    next(error);
  }
};
