export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}


export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}


export interface LoginData {
  email: string;
  password: string;
}


export interface AuthResult {
  success: boolean;
  message: string;
  user?: User;
}