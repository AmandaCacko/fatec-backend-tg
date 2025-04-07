import { Request, Response, NextFunction } from "express";
import { admin } from "../config/firebase";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.body.userId = decodedToken.uid;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};
