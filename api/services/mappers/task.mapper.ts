import { Tasks } from "../../database/entities/task/task.entity";
import { Task } from "../../definitions/Task";

export class TaskMapper {
    static toDTO(task: Tasks): Task{
        return task.get({plain:true});
    }
}