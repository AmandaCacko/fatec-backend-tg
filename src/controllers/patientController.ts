import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { createPatient as createPatientService, getPatientByUserId } from "../services/patientService";
import { Patient } from "../models/Patient";

const db = admin.firestore();

function generateAccessCode(length = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export const createPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientName, userId } = req.body;

    const newPatient: Patient = {
      id: Date.now().toString(),
      patientName,
      accessCode: generateAccessCode(),
      patientStock: {},
      patientDailyRoutine: {},
      patientEventualRoutine: {},
      patientCicleRoutine: {},
    };

    await createPatientService(newPatient);

    const userRef = db.collection("users").doc(userId);
    await userRef.update({
      userEnvironment: admin.firestore.FieldValue.arrayUnion(newPatient.accessCode),
    });

    res.status(201).json({ message: "Paciente criado com sucesso", accessCode: newPatient.accessCode });
  } catch (error) {
    next(error);
  }
};

export const getPatients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.userId;
    const patients = await getPatientByUserId(userId);
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};
