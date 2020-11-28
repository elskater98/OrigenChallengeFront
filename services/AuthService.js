import axios from 'axios';
const API_URL = 'http://josalhor.ddns.net:7987/';

class AuthService {

  login(username,password){
    return axios.post(API_URL+'/api/token/',{
      username:username,password:password
    })
  }

  logout(){
    localStorage.clear();
  }


}

export default  new AuthService();
