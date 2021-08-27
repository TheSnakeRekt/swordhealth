import { NotificationService } from "../notification.service";
import Container, { Service } from "typedi";
import { Task } from "../../definitions/Task";
import { TaskMapper } from "../mappers/task.mapper";
import TaskRepository from "../repositories/task.repository";
import { TaskEvent } from "../../events/task.events";
import { Tasks } from "../../database/entities/task/task.entity";

@Service()
export default class TaskController {

    private taskRepository!: TaskRepository;
    private notificationService!: NotificationService;

    constructor(){
        this.taskRepository = Container.get<TaskRepository>(TaskRepository);
        this.notificationService = Container.get<NotificationService>(NotificationService);
    }

    async getAlltasks(): Promise<Task[]>{
        return (await this.taskRepository.getAllTasks()).map<Task>(TaskMapper.toDTO);
    }

    async getNtasks(limit: number): Promise<Task[]>{
        return (await this.taskRepository.getNtasks(limit)).map<Task>(TaskMapper.toDTO);
    }

    async getAlltasksByTech(technicianId:number): Promise<Task[]>{
        return (await this.taskRepository.getAllTasksByTech(technicianId)).map<Task>(TaskMapper.toDTO);
    }

    async getNtasksByTech(limit: number, technicianId:number): Promise<Task[]>{
        return (await this.taskRepository.getNtasksByTech(limit, technicianId)).map<Task>(TaskMapper.toDTO);
    }

    async deleteTask(id: number): Promise<boolean>{
        return await this.taskRepository.deleteTask(id);
    }

    async createOrUpdate(task: Task): Promise<Task | boolean>{
        const res = await this.taskRepository.createOrUpdate(task);
        
        if(res instanceof Tasks){
            if(!task.id){
                this.notificationService.publishEvent(new TaskEvent(TaskEvent.events.NEW_TASK_EVENT, res));
            }

            return TaskMapper.toDTO(res)
        }

        return res;
    }
}