import httpStatus from "http-status";

import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await UserServices.createUserIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});


const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const userId = req?.user?.userId as string;
  const result = await UserServices.getUserByIdFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  getUserById,
};
