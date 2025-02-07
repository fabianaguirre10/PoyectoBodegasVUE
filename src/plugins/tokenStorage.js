import LocalStorageService from "@/plugins/LocalStorageService";
import store from "../store";
const jwt = require("jsonwebtoken");
const publicKEY = "DebugKey1718135161"

const localStorageService = LocalStorageService.getService();
const token = localStorageService.getAccessToken();

if (token) {

 
  jwt.verify(token, publicKEY, function(err, decodedToken) {
    // if issuer mismatch, err == invalid issuer
    console.log(err);
    console.log(decodedToken);
    const user = {
      idUser: decodedToken.IdUser,
      name: decodedToken.name,
      email: decodedToken.email,
      idAccount: decodedToken.idAccount,
      idProfile: decodedToken.idprofile,
      type: decodedToken.idtype,
      role: decodedToken.rolename,
      idDistribuidor: decodedToken.idDistribuidor,
    };
    store.state.user = user;
  
  
  });
  
  
}
