import { Api } from '../api';
import { AppMiddleware } from '../store';

function makePersistStateMiddleware(api: Api): AppMiddleware {
  return store => next => action => {
    const result = next(action);

    switch (action.type) {
      case 'ACTION_LOGIN_FAILED':
      case 'ACTION_LOGIN_SUCCESS':
        api.local.setState(store.getState());
        break;
      case 'ACTION_LOGOUT_SUCCESS':
        api.local.setState(null);
    }

    return result;
  };
}

export default makePersistStateMiddleware;
