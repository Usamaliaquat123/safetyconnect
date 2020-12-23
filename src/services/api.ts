// import { axios } from "axios";
export class Api {
  base: string = '';
  base_uri: string = '';
  method: string = '';
  param: object = {};
  constructor(base_uri: string, method: string, param: object) {
    this.base_uri = base_uri;
    this.method = method;
    this.param = param;
  }

  post = async () => {
    return 'asd';
  };
}
