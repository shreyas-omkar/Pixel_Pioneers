import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { login, register, verifyMail, logout, forgotPassword, resetPassword, checkAuth } from '../controllers/User.controller.js';

const userRouter = express.Router();

userRouter.get("/checkAuth", verifyToken, checkAuth)
userRouter.post("/register", register )
userRouter.post("/login", login )
userRouter.post("/verifyEmail", verifyMail) 
userRouter.post("/logout", logout)
userRouter.post("/forgotPassword", forgotPassword)
userRouter.post("/resetPassword/:resetPasswordToken", resetPassword)

export default userRouter;