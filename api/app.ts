import express from 'express';
import * as http from 'http';
import 'reflect-metadata'
import cors from 'cors';
import {CommonRoutesConfig} from './common/common.routes.config';
import {TasksRoutes} from './routes/tasks/tasks.routes';
import { auth } from './services/middleware/auth.handler';
import cookieParser from 'cookie-parser';
import { LoginRoutes } from './routes/login/login.routes';
import { Wss } from './wsserver/wsserver.server';
require('dotenv').config();

class App {

    readonly runningMessage = `Server running at ${process.env.BASE_URL}`;

    public app!: express.Application;
    public Wss!: Wss;
    server!: http.Server; 
    port = 3000;

    routes: Array<CommonRoutesConfig> = [];

    constructor(){
        this.init();
        this.listen(this.port);
    }   

    private init(){
        this.app = express();
        this.server = http.createServer(this.app);

        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(cors());
        this.app.use(auth);

        this.routes.push(new LoginRoutes(this.app));
        this.routes.push(new TasksRoutes(this.app));
        this.Wss = new Wss();
    }

    private listen(port: number){
        this.server.listen(port, () => {
            this.routes.forEach((route: CommonRoutesConfig) => {
                console.log(route.getName())
            });
        
            console.log(this.runningMessage);
        });
    }
}

export default new App()