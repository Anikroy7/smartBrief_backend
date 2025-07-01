import express from "express";
import { UserControllers } from "./user.contoller";



const router = express.Router();

router.post(
  "/create",
  UserControllers.createUser
);


export const UsersRoutes = router;
