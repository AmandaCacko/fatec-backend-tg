export interface User {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userType: string;
  userPatient?: string[];
  userEnvironment: string[];
}

export interface PublicUser {
  userId: string;
  userName: string;
  userEmail: string;
  userType: string;
  userPatient?: string[];
  userEnvironment: string[];
}

export const toPublicUser = (user: User): PublicUser => ({
  userId: user.userId,
  userName: user.userName,
  userEmail: user.userEmail,
  userType: user.userType,
  userPatient: user.userPatient,
  userEnvironment: user.userEnvironment,
});
