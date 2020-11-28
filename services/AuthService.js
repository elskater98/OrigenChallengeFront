const axios = require('axios');
class AuthService {

  logout() {
    sessionStorage.clear();
  }

  signup(username,password){
    console.log(username,password);

  }

  isLogged() {
    return sessionStorage.getItem("token") != null;
  }

}

export default new AuthService();
