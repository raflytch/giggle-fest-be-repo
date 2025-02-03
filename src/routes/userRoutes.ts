import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsersController,
  getUser,
  getUserByEmailController,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/email", getUserByEmailController);
router.get("/:id", getUser);
router.get("/", getAllUsersController);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
