export interface Patient {
  patientId: string;
  patientName: string;
  patientAccessCode: string;
  patientStock: Record<string, any>;
  patientDailyRoutine: Record<string, any>;
  patientEventualRoutine: Record<string, any>;
  patientCicleRoutine: Record<string, any>;
  patientEnvironment: string[]; 
}