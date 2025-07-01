import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { User } from '../modules/user/user.model';

export const checkUserCredit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userPayload = req.user; 
    if (!userPayload?.userId) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized access. User ID missing.',
      });
    }

    const user = await User.findById(userPayload.userId);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.credits > 0) {
      return next();
    }

    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: 'Insufficient credits. Please recharge your account.',
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error checking user credits',
      error: error,
    });
  }
};
