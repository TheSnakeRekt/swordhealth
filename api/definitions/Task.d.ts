import { Identifier } from "sequelize/types";

export type Task = {
    id?: Identifier;
    name: String;
    technician_id: Number;
    description: String;
    executed: boolean;
    done_date: Date;
}