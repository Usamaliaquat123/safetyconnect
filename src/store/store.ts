import {EventEmitter} from 'events';
import dispatcher from './dispatcher';
class AppStore extends EventEmitter {
  constructor() {
    super();
  }

  getAll_SOR = async (data: Object) => {
    return await 200;
  };

  createSOR = async (data: Object) => {
    return await 200;
  };

  handleActions = (actions: any) => {
    switch (actions.type) {
      case 'CREATE_SOR':
        // creating sor
        break;
      case 'GET_SOR':
        return;
        break;
      default:
        break;
    }
  };
}

const AppStores = new AppStore();
dispatcher.register();
export default AppStores;
