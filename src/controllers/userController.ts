import { RequestHandler } from "express";
import { User } from "../models/User";
import { v4 as uuidv4 } from "uuid";
import { createUser } from "../services/userService";
import bcrypt from "bcryptjs";

export const handleCreateUser: RequestHandler = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userType } = req.body;

    if (!userName || !userEmail || !userPassword || !userType) {
      res.status(400).json({ error: "Dados incompletos" });
      return;
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser: User = {
      userId: uuidv4(),
      userName,
      userEmail,
      userPassword: hashedPassword,
      userType,
      userPatient: [],
      userEnvironment: [],
    };

    await createUser(newUser);

    res.status(201).json({ message: "Usuário criado com sucesso", userId: newUser.userId });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};
