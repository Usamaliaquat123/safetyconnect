import {EventEmitter} from 'events';
import dispatcher from './dispatcher';
class AppStore extends EventEmitter {
  constructor() {
    super();
  }

  getAll_SOR = async (data: Object) => {
    return await 200
  };

  createSOR = async (data: Object) => {
    return await 200;
  };


  handleActions = 
}

const AppStores = new AppStore();
dispatcher.register()
export default AppStores;
