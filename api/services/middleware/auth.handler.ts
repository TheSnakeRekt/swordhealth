import express, { NextFunction } from "express";
import Container from "typedi";
import { LoginController } from "../controllers/login.controller";

export async function auth(req: express.Request, res: express.Response, next:NextFunction){
  
    req.body.permission = '';
    const token: string = req.cookies.auth_token?.trim() || req.headers.authorization?.trim();
    
    
    if (token && token.length > 0) {
        const user = await Container.get(LoginController).authByToken(token);
        
        if (user) {
            req.body.permission = user.get().role;
        }
    }

    next();
}