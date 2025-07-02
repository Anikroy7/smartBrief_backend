import express from "express";
import { UserControllers } from "./user.contoller";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidationSchema, updateUserValidationSchema } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createUserValidationSchema),
  UserControllers.createUser
);
/* 
router.patch("/recharge-credits",
  auth(USER_ROLE.admin),
  UserControllers.rechargeCreditsToUser) */

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


router.patch(
  "/update/:id",
  validateRequest(updateUserValidationSchema),
  UserControllers.updatedUser
);
router.delete(
  "/delete/:id",
  UserControllers.deleteUser
);

export const UsersRoutes = router;
