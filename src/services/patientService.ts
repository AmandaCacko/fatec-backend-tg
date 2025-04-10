import { db } from "../config/firebase";
import { Patient } from "../models/Patient";

const patientCollection = db.collection("patients");

export const createPatient = async (patient: Patient) => {
  await patientCollection.doc(patient.patientId).set(patient);
};

export const getPatientById = async (patientId: string): Promise<Patient | null> => {
  const doc = await patientCollection.doc(patientId).get();
  return doc.exists ? (doc.data() as Patient) : null;
};

export const updatePatient = async (patientId: string, patientData: Partial<Patient>) => {
  await patientCollection.doc(patientId).update(patientData);
};

export const deletePatient = async (patientId: string) => {
  await patientCollection.doc(patientId).delete();
};

export const getPatientByAccessCode = async (patientAccessCode: string): Promise<Patient | null> => {
  const snapshot = await patientCollection.where("accessCode", "==", patientAccessCode).limit(1).get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as Patient;
};

export const getPatientByUserId = async (userId: string): Promise<Patient[]> => {
  const snapshot = await patientCollection.where("userId", "==", userId).get();
  return snapshot.docs.map(doc => doc.data() as Patient);
};

