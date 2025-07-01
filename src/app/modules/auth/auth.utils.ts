import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";
import { StringValue } from "ms";

interface JwtPayload {
  userId: Types.ObjectId;
  role: string;
  email: string;
}

export const createToken = (
  payload: JwtPayload,
  secret: Secret,
  expiresIn: number | StringValue,
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};
