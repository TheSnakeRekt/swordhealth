import { HasManyGetAssociationsMixin, HasOneCreateAssociationMixin, Identifier, Model } from "sequelize";
import { User } from "../../../definitions/User";
import { Tasks } from "../task/task.entity";

export class Users extends Model<User> implements User{
    
    
    static tablename: string = 'users';

    id!: Identifier;
    name!:string;
    access!: string;
    email!: string;
    role!: string;
    password!: string;
    authToken?: string;

    getTasks!: HasManyGetAssociationsMixin<Tasks>;
    addTask!: HasOneCreateAssociationMixin<Tasks>;

    static associate(){
        Users.hasMany(Tasks)
    }
}