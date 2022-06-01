//import {Users} from './users.model';

export class Users {
  id: string;

  firstName: string;

  lastName: string;

  phoneNumber: string;

  email: string;

  role: any;

  disabled: boolean;

  password: string;

  emailVerified: boolean;

  emailVerificationToken: string;

  emailVerificationTokenExpiresAt: Date;

  passwordResetToken: string;

  passwordResetTokenExpiresAt: Date;

  provider: string;

  avatar: any[];

  createdBy: any; // Users;
  updatedBy: any; //Users;
}

export interface UsersList {
  count: number;
  rows: Users[];
}
