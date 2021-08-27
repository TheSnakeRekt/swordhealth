import redis from 'redis';
import { Service } from "typedi";
import { Event } from '../common/common.events';

require('dotenv').config();

@Service()
export class NotificationService {
    private client: redis.RedisClient;

    static readonly port: string = process.env.REDIS_PORT ? process.env.REDIS_PORT : '6380' ;
    static readonly host = process.env.REDIS_HOST ? process.env.REDIS_HOST : 'redis' ;

    constructor(){
        this.client = redis.createClient(NotificationService.port, { host: NotificationService.host });
    }

    publishEvent(event: Event){
        console.log("Event published: ", event.name);

        event.emit().then(msg=>{
            console.log(msg)
            this.client.publish(msg.channel, msg.content);
        });
    }
}