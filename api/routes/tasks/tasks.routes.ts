import {CommonRoutesConfig} from '../../common/common.routes.config';
import express, { NextFunction } from 'express';
import TaskController from '../../services/controllers/task.controller';
import Container from 'typedi';
import { LoginController } from '../../services/controllers/login.controller';
import { validationResult } from 'express-validator';
import { TaskValidator } from '../../services/validators/task.validator';

export class TasksRoutes extends CommonRoutesConfig {

    static readonly routeName = 'TasksRoutes';
    private taskController: TaskController;

    private loginController: LoginController;
    
    private noPerm = 'No permission';

    constructor(app: express.Application){
        super(app, TasksRoutes.name);
        this.taskController = Container.get<TaskController>(TaskController);
        this.loginController = Container.get<LoginController>(LoginController);
    }

    configureRoutes() {
        this.app.route('/tasks')
            .all(async (req: express.Request, res: express.Response, next:NextFunction)=>{
                
                if(!req.body.permission){
                   return res.status(401).send(this.noPerm).end();
                }

                next();
            })
            .get(async (req: express.Request, res: express.Response) => {

                if(req.body.permission == "MANAGER"){
                    let response;

                    if(req.body?.limit > 0) {
                        response =  await this.taskController.getNtasks(req.body.limit);
                    }else{
                        response = await this.taskController.getAlltasks();
                    }
                    
                    return res.status(200).send(response).end();
                }else if(req.body.permission == "TECHNICIAN"){
                    let response;

                    if(req.body?.limit > 0) {
                        response =  await this.taskController.getNtasksByTech(req.body.limit, req.body.techId);
                    }else{
                        response = await this.taskController.getAlltasksByTech(req.body.techId);
                    }
                    
                    return res.status(200).send(response).end();
                }

              return res.status(401).send(this.noPerm).end();
            })
            .post(TaskValidator.checkTask(),async (req:express.Request, res:express.Response, next:NextFunction)=>{
                const validation = validationResult(req.body);

                if(validation.isEmpty()){
                    return next();
                }else{
                    return res.status(412).send(validation).end();
                }
            }, async  (req: express.Request, res: express.Response)=>{
              
                if(req.body.permission == "TECHNICIAN"){
                    const response = await this.taskController.createOrUpdate(req.body);
                    return res.status(200).send(response).end();
                }

               return res.status(401).send(this.noPerm).end();
            })
            .delete(async (req: express.Request, res: express.Response) => {
                if(req.body.permission == "MANAGER"){
                    const response = await this.taskController.deleteTask(req.body.taskId);
                    return res.status(200).send(response).end();
                }

               return res.status(401).send(this.noPerm).end();
            });
            
        return this.app;
    }
}