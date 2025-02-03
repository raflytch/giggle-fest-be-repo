import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access token not found",
      });
      return;
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          res.status(403).json({
            success: false,
            message: "Invalid token",
          });
          return;
        }

        req.user = user; // Tidak ada error sekarang
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

export const authorizeRole = (allowedRoles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role; // Tidak ada error sekarang

    if (
      !userRole ||
      (Array.isArray(allowedRoles)
        ? !allowedRoles.includes(userRole)
        : allowedRoles !== userRole)
    ) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource",
      });
      return;
    }
    next();
  };
};
