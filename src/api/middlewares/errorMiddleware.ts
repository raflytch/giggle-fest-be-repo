import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../../utils/errorResponse";
import { sendInternalErrorResponse } from "../../utils/internalErrorResponse";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      sendErrorResponse(res, "User already exists", 409);
      return;
    }
  }

  sendInternalErrorResponse(res, err, 500);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  sendErrorResponse(res, "Route not found", 404);
};
