import { Response } from "express";

export const sendErrorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400
): void => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
