import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const token = authHeader.split("Bearer ")[1];

  if (typeof token !== 'string') {
    res.status(401).json({ message: "Token inválido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.userId = decoded.userId; 
    
    if (typeof decoded === "object" && decoded !== null && "userId" in decoded) {
      req.userId = (decoded as { userId: string }).userId;
      next();
    } else {
      res.status(401).json({ message: "Token inválido" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};