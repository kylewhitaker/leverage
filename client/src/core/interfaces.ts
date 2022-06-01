import { CognitoUser } from '@aws-amplify/auth';

export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface AwsUser extends CognitoUser {
  attributes: {
    sub: string;
    name: string;
    email: string;
  };
}
