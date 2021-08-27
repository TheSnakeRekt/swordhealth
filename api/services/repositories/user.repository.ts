import { UserMapper } from "../mappers/user.mapper";
import Container, { Service } from "typedi";
import { Database } from "../../database/database";
import { Users } from "../../database/entities/user/user.entity";
import { UserDTO } from "../../definitions/DTO/User.dto";


@Service()
export class UserRepository {

    private database: Database;

    constructor(){
        this.database = Container.get<Database>(Database);
    }

    async getUserByEmail(email: string): Promise<Users | null> {
      const result = await this.database.getUserRepository().findOne({where:{email: email}});
      return result;
    }

    async login(user: Users, authToken: string): Promise<UserDTO>{
      user.authToken = authToken;
      return UserMapper.toDTO(await user.save());
    }

    async logout(authToken: string): Promise<boolean>{
      const result = await this.findAuthToken(authToken);

      if(result){
        result.authToken = '';
        result.save();
        return true;
      }

      return false; 
    }

    async findAuthToken(authToken: string){
      return await this.database.getUserRepository().findOne({where:{authToken:authToken}});
    }
}