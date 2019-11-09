import { action } from 'typesafe-actions';
import { User } from './types';

export function setUser(user: User | null) {
  return action('ACTION_SET_USER', user);
}

export type UserAction = ReturnType<typeof setUser>;
