import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import { StringValue } from "ms";



const loginUser = async (payload: TLoginUser) => {

  const user = await User.findOne({ email: payload.email }).select(
    "email password role"
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid crediantial!");
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Invalid crediantial!");


  const newUser = await User.findOne({ email: payload.email }).select(
    "email name role"
  );
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
    name: newUser?.name,
  };



  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as StringValue
  );

  return {
    accessToken,
    newUser,
  };
};


export const AuthServices = {
  loginUser,

};
