import axios from 'axios';
const API_URL = 'http://josalhor.ddns.net:7987';

class AuthService {
  /*login(username,password){
    return axios.post(API_URL+'/api/token/',{
      username:username,password:password
    }).then((value)=>{
      console.log(value);
      sessionStorage.setItem("token",JSON.stringify(value.data.access));
    }).catch((error) => {
      console.log(error)
    });
  }*/

  logout(){
    sessionStorage.clear();
  }

  isLogged(){
    return sessionStorage.getItem("token")!=null;
  }


}

export default  new AuthService();
