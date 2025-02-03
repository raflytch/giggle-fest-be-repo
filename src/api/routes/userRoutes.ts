import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserController,
  getUserByEmailController,
  updateUserController,
  createAdminController,
} from "../controllers/userController";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/authMiddleware";

const router = express.Router();

router.get(
  "/email",
  authenticateToken,
  authorizeRole(["admin"]),
  getUserByEmailController
);
router.get("/:id", authenticateToken, getUserController);
router.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  getAllUsersController
);

router.post(
  "/admin",
  authenticateToken,
  authorizeRole(["admin"]),
  createAdminController
);

router.post("/", createUserController);

router.patch("/:id", authenticateToken, updateUserController);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  deleteUserController
);

export default router;
