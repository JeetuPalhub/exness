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
  next:any
) => {
  const token = req.headers.authorization;
  console.log("token", token)
  console.log(token)
  if (!token) {
    const payload = jwt.verify(token, JWTPASSWORD) as { userId: UUID };

    // Attach userId to request
    req.id = payload.userId;

    next(); // token valid → allow route
   } else {
     res.status(401).json({
      message: "Unauthorized",
    });
  }
};
