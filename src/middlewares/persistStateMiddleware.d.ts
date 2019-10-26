import { Api } from '../api';
import { AppMiddleware } from '../store';
declare function makePersistStateMiddleware(api: Api): AppMiddleware;
export default makePersistStateMiddleware;
