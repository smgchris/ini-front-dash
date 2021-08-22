import axios from "axios";

const API_URL = "https://lacorniche.rw/api/login.php";

class AuthService {
  // login(username, password) {
  //   return axios
  //     .post(API_URL , 
  //       { username, password })
  //     .then((response) => {
  //       if (response.data) {
  //         localStorage.setItem("user", JSON.stringify(response.data));
  //       }
         
  //       return response.data;
  //     });
  // }

  login(username,password){
    return fetch('http://localhost:8080/auth', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
             'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE,PUT',
             "Access-Control-Allow-Headers": "X-Requested-With,content-type"
        },
        body: JSON.stringify({'username':username,
        'password':password})
    })
    .then(res => res.json())
    .then((response) => {
      if (response) {
        localStorage.setItem("tkn", JSON.stringify(response.jwt));
      }
      return response;
    });
        
  }

  // logout() {
  //   localStorage.removeItem("user");
  // }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
