import httpStatus from "http-status";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";


const createUserIntoDB = async (payload: IUser) => {
  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
  }
  return newUser;
};

export const UserServices = {
  createUserIntoDB,
};
