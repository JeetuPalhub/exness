import jwt from "jsonwebtoken";
import { JWTPASSWORD } from "../type";
import { Request, Response, NextFunction } from "express";
import { UUID } from "crypto";

// Extend Request so we can add req.id
export interface CustomRequest extends Request {
  id?: UUID;
}

export const userMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    // Verify Token
    const payload = jwt.verify(token, JWTPASSWORD) as { userId: UUID };

    // Attach userId to request
    req.id = payload.userId;

    next(); // token valid → allow route
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
