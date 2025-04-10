import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";
import { toPublicUser, User } from "../models/User";

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userEmail, userPassword } = req.body;
    const { user, token } = await authService.login(userEmail, userPassword);

    const publicUser = toPublicUser(user);

    res.status(200).json({ user: publicUser, token });
  } catch (error) {
    res.status(401).json({ message: "Credenciais inválidas" });
  }
};

export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.body.userId;
    const user = await authService.getUserById(userId);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const publicUser = toPublicUser(user);
    res.status(200).json(publicUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "Logout efetuado com sucesso" });
};
