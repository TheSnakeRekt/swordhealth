import { AuthenticationHelper } from "../utils/authentication.utils";
import Container, { Service } from "typedi";
import { UserRepository } from "../repositories/user.repository";
import { UserDTO } from "../../definitions/DTO/User.dto";
import { Users } from "../../database/entities/user/user.entity";


@Service()
export class LoginController {
    private loginRepository: UserRepository;

    constructor(){
        this.loginRepository = Container.get<UserRepository>(UserRepository);
    }

    async login(username: string, password: string, token: string): Promise<UserDTO | boolean>{
        if(username){
            const user = await this.loginRepository.getUserByEmail(username);

            if(user){
                let resp = await AuthenticationHelper.authenticate(password, user.get().password);

                if(resp) {
                    return await this.loginRepository.login(user, token);
                }

                return resp;
            }
            return false;
        }
        return false;
    }

    async logout(authToken:string){
        return await this.loginRepository.logout(authToken);
    }

    async authByToken(authToken: string): Promise<Users | null>{
        return await this.loginRepository.findAuthToken(authToken);
    }
}