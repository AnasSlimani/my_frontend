import { jwtDecode } from "jwt-decode";

export function isAuthenticated() {
    const token = localStorage.getItem("jwtToken");
    return token;
  }
  
export function UsersInfos(){
    const token = localStorage.getItem("jwtToken");
    if(token){
        return jwtDecode(token);
    }
    return null
}
  