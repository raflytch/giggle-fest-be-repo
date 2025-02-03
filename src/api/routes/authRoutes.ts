import express from "express";
import { loginController } from "../controllers/authController";

const router = express.Router();

router.post("/", loginController);

export default router;
