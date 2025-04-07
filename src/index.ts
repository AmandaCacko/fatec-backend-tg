import "./config/env";
import { db } from "./config/firebase";

const test = async () => {
  const doc = db.collection("test").doc("hello");
  await doc.set({ message: "Firebase funcionando 🔥" });
  console.log("✅ Documento criado no Firestore!");
};

test();
