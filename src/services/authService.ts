import { db } from "../config/firebase";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userCollection = db.collection("users");

const login = async (userEmail: string, userPassword: string) => {
  if (!userEmail || !userPassword) {
    throw new Error("Dados incompletos");
  }

  const snapshot = await userCollection.where("userEmail", "==", userEmail).get();
  if (snapshot.empty) {
    throw new Error("E-mail não encontrado");
  }

  const userDoc = snapshot.docs[0];
  const data = userDoc.data();

  const user: User = {
    userId: userDoc.id,
    userName: data.userName,
    userEmail: data.userEmail,
    userPassword: data.userPassword,
    userType: data.userType,
    userPatient: data.userPatient || [],
    userEnvironment: data.userEnvironment || [],
  };

  const isPasswordCorrect = await bcrypt.compare(userPassword, user.userPassword);
  
  if (!isPasswordCorrect) {
    throw new Error("Senha incorreta");
  }

  const token = jwt.sign({ userId: userDoc.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return { user, token };
};

const getUserById = async (userId: string): Promise<User | null> => {
  const doc = await userCollection.doc(userId).get();
  if (!doc.exists) return null;
  return doc.data() as User;
};

export default {
  login,
  getUserById,
};
