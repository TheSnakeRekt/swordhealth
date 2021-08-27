import { Sequelize } from "sequelize";


export function getCon() {

    const connection = () : Sequelize =>{
        const dbName = process.env.DATABASE_NAME ? process.env.DATABASE_NAME : '';
        const dbPassword = process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : '';
        const dbUser = process.env.DATABASE_USER ? process.env.DATABASE_USER : 'swordhealth_user';
        const host = process.env.HOSTNAME ? process.env.HOSTNAME : '127.0.0.1';

        let instance = {} as Sequelize;

        try {
            instance = new Sequelize(dbName, dbUser, dbPassword, {
                host:host,
                port:3306,
                dialect: 'mariadb',
                dialectOptions:{
                    allowPublicKeyRetrieval:true //not safe but for dev purposes 
                },
                logging: false
            });
        } catch (error) {
           
        } finally {
            return instance;
        }
    } 
    
    return connection();
}