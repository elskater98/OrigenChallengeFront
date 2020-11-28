const axios = require('axios');
class AuthService {

  logout() {
    sessionStorage.clear();
  }

  isLogged() {
    return sessionStorage.getItem("token") != null;
  }

}

export default new AuthService();
