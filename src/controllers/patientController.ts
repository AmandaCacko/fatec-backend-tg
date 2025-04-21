import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { createPatient as createPatientService, getPatientByUserId, getPatientByAccessCode, updatePatient } from "../services/patientService";
import { Patient } from "../models/Patient";
import { updateUser } from "../services/userService";

const db = admin.firestore();

function generateAccessCode(length = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export const createPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientName } = req.body;
    const userId = req.userId;

    if (!patientName || !userId) {
      res.status(400).json({ message: "patientName and userId are required" });
      return;
    }

    const newPatient: Patient = {
      patientId: Date.now().toString(),
      patientName,
      patientAccessCode: generateAccessCode(),
      patientStock: {},
      patientDailyRoutine: {},
      patientEventualRoutine: {},
      patientCicleRoutine: {},
      patientEnvironment: [userId],
    };

    await createPatientService(newPatient);

    const userRef = db.collection("users").doc(userId);
    await userRef.update({
      userEnvironment: admin.firestore.FieldValue.arrayUnion(newPatient.patientAccessCode),
    });

    res.status(201).json({ message: "Paciente criado com sucesso", patientAccessCode: newPatient.patientAccessCode });
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
export const joinPatient = async (req: Request, res: Response): Promise<void> => {
  const { accessCode } = req.body;
  const userId = req.userId; 

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return;
  }

  try {
    const patient = await getPatientByAccessCode(accessCode);
    if (!patient) {
      res.status(404).json({ message: "Paciente não encontrado" });
      return;
    }

    if (!patient.patientEnvironment.includes(userId)) {
      const updatedEnvironment = [...patient.patientEnvironment, userId];
      await updatePatient(patient.patientId, { patientEnvironment: updatedEnvironment });
    }
    
    await updateUser (userId, {
      userType: "C",
      userEnvironment: [...patient.patientEnvironment],
    });

    res.status(200).json(patient);
  } catch (error) {
    console.error("Erro ao buscar paciente:", error);
    res.status(500).json({ message: "Erro ao buscar paciente" });
  }
};