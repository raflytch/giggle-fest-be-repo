import express from "express";
import userRouter from "./userRoutes";
import loginRouter from "./authRoutes";

const router = express.Router();

router.use("/users", userRouter);
router.use("/login", loginRouter);

export default router;
