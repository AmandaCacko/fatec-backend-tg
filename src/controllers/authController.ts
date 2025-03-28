import { Request, Response } from "express";
import admin from "../config/firebase";
import * as firebase from "firebase-admin";  // Adicione a importação do Firebase Admin

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);

    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

    const token = await admin.auth().createCustomToken(user.uid);

    return res.json({ token });

  } catch (error) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
};
