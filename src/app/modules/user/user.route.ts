import express from "express";
import { UserControllers } from "./user.contoller";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidationSchema } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createUserValidationSchema),
  UserControllers.createUser
);

router.get(
  "/all",
  auth(USER_ROLE.admin),
  UserControllers.getAllUsers
);

router.get(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getUserById
);
export const UsersRoutes = router;
