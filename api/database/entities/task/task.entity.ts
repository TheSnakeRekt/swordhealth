import { BelongsToGetAssociationMixin, HasOneGetAssociationMixin, Identifier, Model } from "sequelize";
import { Task } from "../../../definitions/Task";
import { Users } from "../user/user.entity";

export class Tasks extends Model<Task> implements Task {


    static tablename: String = 'tasks';
    
    id!: Identifier;
    name!: String;
    description!: String;
    executed!: boolean;
    done_date!: Date;
    technician_id!: Number;

    getUser !: BelongsToGetAssociationMixin<Users>;

    static associate() {
        Tasks.belongsTo(Users, {foreignKey:'technician_id'});
    }

    static async createOrUpdate(values: Task): Promise<Tasks | boolean>{
        if(values.id){
            const task = await this.findOne({where:{id:values.id}})
                if(task)
                    return await task.update(values);
                return false;
        }

        return await Tasks.create(values);
    }
}