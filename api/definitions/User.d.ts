import { Identifier } from "sequelize/types";

export type User = {
    id?: Identifier;
    name: string;
    email: string;
    password: string;
    role: string;
    authToken?: string;
}