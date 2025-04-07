import { db } from "../config/firebase";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userCollection = db.collection("users");

export const login = async (email: string, password: string) => {
  const snapshot = await userCollection.where("USER_EMAIL", "==", email).get();
  if (snapshot.empty) {
    throw new Error("Credenciais inválidas");
  }

  const userDoc = snapshot.docs[0];

  const data = userDoc.data();

  const user: User = {
    id: userDoc.id,
    userName: data.USER_NAME,
    userEmail: data.USER_EMAIL,
    userPassword: data.USER_PASSWORD,
    userType: data.USER_TYPE,
    userPatient: data.USER_PATIENT,
    userEnvironment: data.USER_ENVIRONMENT,
  };
  
  const isPasswordCorrect = await bcrypt.compare(password, user.userPassword);

  
  if (!isPasswordCorrect) {
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign({ id: userDoc.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  return { user, token };
};

const getUserById = async (id: string): Promise<User | null> => {
  const doc = await userCollection.doc(id).get();
  if (!doc.exists) return null;
  return doc.data() as User;
};

export default {
  login,
  getUserById,
};
