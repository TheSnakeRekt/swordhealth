import Container from "typedi";
import express, { Application } from "express";

import { LoginController } from "../../services/controllers/login.controller";
import { AuthenticationHelper } from "../../services/utils/authentication.utils";
import { CommonRoutesConfig } from "../../common/common.routes.config";


export class LoginRoutes extends CommonRoutesConfig {

    
    static readonly routeName = 'LoginRoutes';
    private loginController: LoginController;
    
    constructor(app:express.Application){
        super(app, LoginRoutes.name);
        this.loginController = Container.get<LoginController>(LoginController);

        this.configureRoutes();
    }

    configureRoutes(): Application {
        this.app.route('/login')
        .post(async (req: express.Request, res: express.Response) =>{
            const random = AuthenticationHelper.generateId();
            const result = await this.loginController.login(req.body.username, req.body.password, random);

           
            if(result){
              return  res.setHeader('authorization', random)
                .cookie('auth_token', random, { maxAge: 45000, httpOnly: true })
                .status(200)
                .send(result).end();
            }

            return res.status(401).send('Wrong user or password');
        })

        return this.app;
    }

}