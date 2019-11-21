/* eslint-disable no-underscore-dangle */
class Store {
  constructor() {
    this._id = localStorage.getItem('id');
    this._token = localStorage.getItem('token');
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
    localStorage.setItem('id', id);
  }

  get token() {
    return this._token;
  }

  set token(token) {
    this._token = token;
    localStorage.setItem('token', token);
  }

  clear() {
    this._id = null;
    this._token = null;
    localStorage.clear();
  }
}

export default new Store();
