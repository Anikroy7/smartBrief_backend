import httpStatus from "http-status";
import { IRechargePayload, IUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";


const createUserIntoDB = async (payload: IUser) => {
  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
  }
  return newUser;
};


/* export const rechargeCreditsToUserIntoDB = async (payload: IRechargePayload) => {
  const { userId, creditAmount } = payload;

  if (!userId || creditAmount === undefined) {
    throw new AppError(httpStatus.BAD_REQUEST, "User ID and credit amount are required");
  }

  if (creditAmount <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Credit amount must be greater than zero");
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $inc: { credits: creditAmount } },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return updatedUser;
}; */


const getAllUsersFromDB = async () => {
  const users = await User.find({});
  return users;
};

const getUserByIdFromDB = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const updateUserByIdIntoDB = async (id: string, payload: Partial<IUser>) => {
  const updatedUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return updatedUser;
};

const deleteUserByIdFromDB = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return deletedUser;
}
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserByIdIntoDB,
  deleteUserByIdFromDB,
  // rechargeCreditsToUserIntoDB
};
