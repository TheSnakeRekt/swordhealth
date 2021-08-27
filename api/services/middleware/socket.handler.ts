import Container from "typedi";
import { LoginController } from "../../services/controllers/login.controller";

export async function authSocket(auth:string){
    if (auth && auth.length > 0) {
        const user = await Container.get(LoginController).authByToken(auth);
        
        if (user) {
            return "MANAGER" == user.get().role;
        }

        return false;
    }
    return false;
}