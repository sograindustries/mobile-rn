import local from './local';
import patch from './patch';
import { makeAuthService } from './services/auth';
import { makeEcgService } from './services/ecg';

export const makeApi = () => {
  return {
    local,
    patch,
    auth: makeAuthService(),
    ecg: makeEcgService()
  };
};

export type Api = ReturnType<typeof makeApi>;
