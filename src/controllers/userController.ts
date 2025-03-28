import { Request, Response } from "express";
import admin from "../config/firebase";

export const createUser = async (req: Request, res: Response) => {
  const { userName, userEmail, userPassword } = req.body;

  try {
    const userRef = await admin.firestore().collection('users').add({
      USER_NAME: userName,
      USER_EMAIL: userEmail,
      USER_PASSWORD: userPassword,
      USER_TYPE: "C",
      patients: [],
    });

    return res.status(201).json({ message: "Usuário criado com sucesso", userId: userRef.id });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};
