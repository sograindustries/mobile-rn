import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { User } from '../../store/session/types';
export declare const makeAuthService: () => {
    login: (username: string, password: string) => Promise<User>;
    signup: (username: string, password: string) => Promise<AmazonCognitoIdentity.CognitoUser>;
    refresh: (refreshToken: string) => Promise<User>;
    getCurrentUser: () => Promise<User | null>;
    signOut: () => Promise<unknown>;
};
