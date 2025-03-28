import { Request, Response } from "express";
import admin from "../config/firebase";

export const createPatient = async (req: Request, res: Response) => {
  const { patientName, userId } = req.body;

  try {
    const patientRef = await admin.firestore().collection('patients').add({
      PATIENT_NAME: patientName,
      caretakers: [userId], 
    });

    const caretakerRef = admin.firestore().collection('users').doc(userId);
    await caretakerRef.update({
      patients: admin.firestore.FieldValue.arrayUnion(patientRef.id), // Adiciona paciente ao cuidador
    });

    return res.status(201).json({ message: 'Paciente criado com sucesso', patientId: patientRef.id });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar paciente", error });
  }
};

export const getPatients = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const caretakerRef = admin.firestore().collection('users').doc(userId);
    const caretakerDoc = await caretakerRef.get();

    if (!caretakerDoc.exists) {
      return res.status(404).json({ message: "Cuidador não encontrado" });
    }

    const caretakerData = caretakerDoc.data();
    const patientIds = caretakerData?.patients || [];

    const patientDocs = await Promise.all(
      patientIds.map((patientId: string) =>
        admin.firestore().collection('patients').doc(patientId).get()
      )
    );

    const patients = patientDocs.map(doc => doc.data());
    return res.status(200).json({ patients });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao obter pacientes", error });
  }
};
