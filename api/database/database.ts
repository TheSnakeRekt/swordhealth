import { DataTypes, Sequelize} from 'sequelize';
import { Service } from 'typedi';
import { getCon } from './database.config';
import { Tasks } from './entities/task/task.entity';
import { Users } from './entities/user/user.entity';


@Service()
export class Database {

    private sequelize: Sequelize;

    private readonly taskRepository = Tasks;
    private readonly userRepository = Users;

    constructor(){
        this.sequelize = getCon();
        
        this.init(this.sequelize);
       
        this.sequelize.sync({alter:true}).catch(err=>{
            console.error(err);
        });
    }
   
    private init(sequelize: Sequelize){

        Users.init({ 
            id: {
                type:DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true, 
                allowNull:false
            },
            email: {
                type:DataTypes.STRING,
                unique:true
            },
            name: DataTypes.STRING,
            role: DataTypes.STRING,
            password: DataTypes.STRING,
            authToken: DataTypes.STRING
        }, {modelName: Users.tableName, sequelize: sequelize});

        Tasks.init({
            id:{
                type:DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull:false
            },
            technician_id:{
                type:DataTypes.INTEGER,
                references:{
                  model: Users,
                  key: 'id',
                }
            },
            name:DataTypes.STRING,
            description: DataTypes.TEXT,
            executed:{type: DataTypes.BOOLEAN, defaultValue: false},
            done_date: DataTypes.DATE
        }, {modelName:Tasks.tableName, sequelize:sequelize});

        Users.associate();
        Tasks.associate();
    }

    getSequelize(){
        return this.sequelize;
    }

    getTaskRepository(){
        return this.taskRepository;
    }

    getUserRepository(){
        return this.userRepository;
    }
}