import { UserDTO } from "../../definitions/DTO/User.dto";
import { Users } from "../../database/entities/user/user.entity";

export class UserMapper {
    static toDTO(user: Users): UserDTO {
        return {
           name : user.get('name'),
           email: user.get('email'),
           role: user.get('role')
        };
    }
}