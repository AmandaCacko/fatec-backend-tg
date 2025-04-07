import { db } from "../config/firebase";
import { Patient } from "../models/Patient";

const patientCollection = db.collection("patients");

export const createPatient = async (patient: Patient) => {
  await patientCollection.doc(patient.id).set(patient);
};

export const getPatientById = async (id: string): Promise<Patient | null> => {
  const doc = await patientCollection.doc(id).get();
  return doc.exists ? (doc.data() as Patient) : null;
};

export const updatePatient = async (id: string, patientData: Partial<Patient>) => {
  await patientCollection.doc(id).update(patientData);
};

export const deletePatient = async (id: string) => {
  await patientCollection.doc(id).delete();
};

export const getPatientByAccessCode = async (code: string): Promise<Patient | null> => {
  const snapshot = await patientCollection.where("accessCode", "==", code).limit(1).get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as Patient;
};

export const getPatientByUserId = async (userId: string): Promise<Patient[]> => {
  const snapshot = await patientCollection.where("userId", "==", userId).get();
  return snapshot.docs.map(doc => doc.data() as Patient);
};

