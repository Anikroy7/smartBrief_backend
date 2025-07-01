import express from "express";
import { UserControllers } from "./user.contoller";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidationSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createUserValidationSchema),
  UserControllers.createUser
);


export const UsersRoutes = router;
