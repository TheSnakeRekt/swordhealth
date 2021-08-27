import Container, { Service } from "typedi";
import { Database } from "../../database/database";
import { Tasks } from "../../database/entities/task/task.entity";
import { Task } from "../../definitions/Task";


@Service()
export default class TaskRepository {

    private database : Database;

    constructor(){
        this.database = Container.get<Database>(Database);
    }

    async getAllTasks(): Promise<Tasks[]> {
        return await this.database.getTaskRepository().findAll();
    }

    async getNtasks(limit: number): Promise<Tasks[]> {
        return await this.database.getTaskRepository().findAll({limit: limit});
    }

    async getAllTasksByTech(technicianId: number): Promise<Tasks[]> {
        return await this.database.getTaskRepository().findAll({where:{technician_id: technicianId}});
    }

    async getNtasksByTech(limit: number, technicianId: number): Promise<Tasks[]> {
        return await this.database.getTaskRepository().findAll({where:{technician_id: technicianId}, limit: limit});
    }

    async deleteTask(id: number): Promise<boolean> {
        const deleted = await this.database.getTaskRepository().destroy({where:{id: id}});
        return deleted > 0;
    }

    async createOrUpdate(task: Task): Promise<Tasks | boolean> {
        return await this.database.getTaskRepository().createOrUpdate(task);
    }
}