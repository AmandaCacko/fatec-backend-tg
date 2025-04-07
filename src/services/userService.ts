import { db } from "../config/firebase";
import { User } from "../models/User";

const userCollection = db.collection("users");

export const createUser = async (user: User) => {
  await userCollection.doc(user.id).set(user);
};

export const getUserById = async (id: string): Promise<User | null> => {
  const doc = await userCollection.doc(id).get();
  return doc.exists ? (doc.data() as User) : null;
};

export const updateUser = async (id: string, userData: Partial<User>) => {
  await userCollection.doc(id).update(userData);
};

export const deleteUser = async (id: string) => {
  await userCollection.doc(id).delete();
};
