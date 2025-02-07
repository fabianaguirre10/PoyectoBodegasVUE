import { http } from "@/plugins/axios";
import LocalStorageService from "@/plugins/LocalStorageService";
// LocalstorageService
const localStorageService = LocalStorageService.getService();
const jwt = require("jsonwebtoken");
const publicKEY = "DebugKey1718135161"


export async function signIn(context, user) {
  try {
    context.commit("setLoading", true, { root: true });
    const response = await http.post(`/Login/AuthEngineV2`, user);
    localStorageService.setToken(response.token);

    jwt.verify(response.token, publicKEY, function(err, decodedToken) {
      // if issuer mismatch, err == invalid issuer
      const userData = {
        idUser: decodedToken.IdUser,
        name: decodedToken.name,
        email: decodedToken.email,
        idAccount: decodedToken.idAccount,
        idProfile: decodedToken.idprofile,
        type: decodedToken.idtype,
        idDistribuidor: decodedToken.idDistribuidor,
      };
      console.log(decodedToken)
      context.commit("setUserData", userData, { root: true });
    context.commit("setUser");
    
    });


    
    
  } catch (e) {
    context.commit("authError");
    context.commit("setError", e.message, { root: true });
  } finally {
    context.commit("setLoading", false, { root: true });
  }
}
