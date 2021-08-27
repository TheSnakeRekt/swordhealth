import { Message } from "definitions/Message";

export abstract class Event {
    abstract name: string;
    abstract emit() : Promise<Message> ;
}