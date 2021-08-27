import WebSocket  from 'ws';
import redis from 'redis';

import { Channel } from '../services/utils/enum/channel.enum';
import { NotificationService } from '../services/notification.service';
import { authSocket } from '../services/middleware/socket.handler';

export class Wss {
    /* 
        This could be implemented in another docker service, and instead of using the DB to see if the authtoken is valid,
        we could use redis directly by inserting the authtoken and the user role as a key:value at Login
    */ 
    private wss!: WebSocket.Server;
    private client!: redis.RedisClient;

    constructor(){
        this.wss = new WebSocket.Server({ port: 8100 });
        this.client = redis.createClient(NotificationService.port, { host: NotificationService.host });
        this.init();
    }

    private init(){
        this.client.subscribe(Channel.MANAGER);

        this.wss.on('connection', async (socket: WebSocket)=> {
            socket.on('message',async (msg: WebSocket.Data)=>{

                if(await authSocket(msg.toString()) === false){
                    socket.send(401)
                    socket.close()
                    return socket.terminate();
                }

                this.client.on('message', (channel, message)=>{
                    if(socket.OPEN){
                        socket.send(message);
                    }
                });
            });
        });
    }
}