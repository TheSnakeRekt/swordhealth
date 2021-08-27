import { Event }from "../common/common.events";
import { Tasks } from "../database/entities/task/task.entity";
import { Message } from "../definitions/Message";
import { Channel } from "../services/utils/enum/channel.enum";

export class TaskEvent extends Event {

    static events = {
        NEW_TASK_EVENT:"NEW_TASK_EVENT"
    };

    name: string;
    task: Tasks;

    constructor(event: string, task: Tasks){
        super();
        this.name = event;
        this.task = task;
    }

    emit(): Promise<Message> {
        switch(this.name){
            case TaskEvent.events.NEW_TASK_EVENT:
                return this.newTask(this.task);
        }

        return Promise.resolve({} as Message);
    }

    private async newTask(task: Tasks): Promise<Message> {
        return {channel: Channel.MANAGER, content:`New task, ${task.get('name')} was created by ${(await task.getUser()).name} on ${task.get('done_date').toLocaleString()}`};
    }
}