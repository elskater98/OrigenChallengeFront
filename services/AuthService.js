class AuthService {
  isLogged() {
    return sessionStorage.getItem("token") != null;
  }

}

export default new AuthService();
