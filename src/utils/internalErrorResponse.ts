import { Response } from "express";

export const sendInternalErrorResponse = (
  res: Response,
  error: Error,
  statusCode: number = 500
): void => {
  console.error(error);
  res.status(statusCode).json({
    success: false,
    message: "Internal server error",
  });
};
