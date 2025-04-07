export interface User {
    id: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userType: string;
    userPatient?: string[];
    userEnvironment: string[];
  }