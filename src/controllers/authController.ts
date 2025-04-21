import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";
import { toPublicUser, User } from "../models/User";
import { getPatientByUserId } from "../services/patientService";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { userEmail, userPassword } = req.body;

  try {
    const { user, token } = await authService.login(userEmail, userPassword);
    const patients = await getPatientByUserId(user.userId);

    res.status(200).json({ user, token, patients });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Erro desconhecido" });
    }
  }
};

export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.userId!; 
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
