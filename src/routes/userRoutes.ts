import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);
router.put("/", updateUser);
router.delete("/:id", deleteUser);

export default router;
