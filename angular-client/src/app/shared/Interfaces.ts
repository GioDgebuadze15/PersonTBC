export interface Person {
  id?: number
  firstName: string;
  lastName: string;
  personalId: number;
  dateOfBirth?: string;
  gender: string;
  accountStatus: string;
}

export interface UpdatePerson {
  id: number
  firstName: string;
  lastName: string;
  personalId: number;
  dateOfBirth?: string;
  gender: string;
  status: number;
}

export interface Response {
  statusCode: number,
  error?: string,
  data?: object
}

export interface AuthResponse {
  statusCode: number,
  error?: string,
  token?: string
}

