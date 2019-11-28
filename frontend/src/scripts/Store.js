export default {
  state: {
    token: localStorage.getItem('token'),
  },
  setToken(token) {
    this.state.token = token;
    localStorage.setItem('token', token);
  },
  clear() {
    this.state.token = null;
    localStorage.clear();
  },
};
