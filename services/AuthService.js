import axios from 'axios';
const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {

  login(username,password){
    return axios.post(API_URL+'',{
      username:username,password:password
    })
  }

  logout(){
    localStorage.clear();
  }


}

export default  new AuthService();
