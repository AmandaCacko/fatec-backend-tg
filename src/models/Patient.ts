export interface Patient {
    id: string;
    patientName: string;
    accessCode: string;
    patientStock: Record<string, any>;
    patientDailyRoutine: Record<string, any>;
    patientEventualRoutine: Record<string, any>;
    patientCicleRoutine: Record<string, any>;
  }