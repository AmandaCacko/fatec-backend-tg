import { db } from "../config/firebase";
import { User } from "../models/User";

const userCollection = db.collection("users");

export const createUser = async (user: User) => {
  await userCollection.doc(user.userId).set(user);
};

export const getUserById = async (userId: string): Promise<User | null> => {
  const doc = await userCollection.doc(userId).get();
  return doc.exists ? (doc.data() as User) : null;
};

export const updateUser = async (userId: string, userData: Partial<User>) => {
  await userCollection.doc(userId).update(userData);
};

export const deleteUser = async (userId: string) => {
  await userCollection.doc(userId).delete();
};
