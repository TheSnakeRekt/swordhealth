import request from 'supertest'
import { assert, expect } from "chai";
import { Task } from 'definitions/Task';
import App from 'app';


const task_1 = {
    id:'',
    name: "tarefa 1",
    technician_id: 2,
    description: "Texto descriptivo curto para ver se funciona",
    executed: false,
    done_date:  new Date(Date.now())
}

let tasks = [] as Task[];

const app = App.app;
let auth_token: string;

describe('Technician Login', ()=>{
    it('Should Login as Technician',(done)=>{
        request(app)
        .post('/login')
        .send({username:'solidusdex4@gmail.com', password:'PasswordTeste_1'})
        .expect(200).then((response)=>{
            expect(response.header).to.have.property('authorization').not.empty;
            auth_token = `auth_token=${response.header.authorization}`;
            expect(auth_token).to.not.be.empty
            done()
        }).catch((err)=>{
            console.error(err)
            assert(false,`Technician Login: ${err}`);
            done();
        });
    }).slow(500);
});

describe('Technician POST NEW',()=>{
    it('Should Post a new Task', (done)=>{
        request(app)
        .post('/tasks')
        .send(task_1)
        .set('Cookie', auth_token).expect(200).then(res=>{
            expect(res.body).to.be.an('object').with.property('id');
            task_1.id = res.body.id;
            assert(true, res.body);
            done();
        }).catch(err=>{
            console.log(err)
            assert(false,`Technician Post Task: ${err}`);
            done();
        })
    }).timeout(5000);
}).slow(120);

describe('Tecnician POST modify',()=>{
    before(()=>{
        task_1.description = "modified description for testing";
    })
    it('Should modify existing task',(done)=>{
        request(app)
            .post('/tasks')
            .send(task_1)
            .set('Cookie', auth_token).expect(200).then((res)=>{
                expect(res.body).to.have.property('description').not.equal("Texto descriptivo curto para ver se funciona");
                assert(true, res.body);
                done()
            }).catch((err)=>{
                console.error(err)
                assert(false, `Technician Modify Task: ${err}`);
                done();
            })
    });
}).slow(120);

describe('Technician GET',()=>{
    it('Should return all tasks for technician', (done)=>{
        request(app)
        .get('/tasks')
        .send({techId:2})
        .set('Cookie', auth_token).expect(200).then(res => {
            expect(res.body).to.be.an('array','Tasks were fetched');
            assert(true, res.body);
            done()
        }).catch(err=>{
            console.error(err)
            assert(false, `Manager Get Tasks: ${err}`);
            done();
        })
    });
}).slow(120);


describe('Manager Login', () => {
    it('Should have valid Manager EndPoints',(done)=>{
        request(app)
        .post('/login')
        .send({username:'jorgeradasilva@gmail.com', password:'PasswordTeste_0'})
        .expect(200).then(res=> {
            expect(res.header).to.have.property('authorization').not.empty;
            auth_token = `auth_token=${res.header.authorization}` ;
            expect(auth_token).to.not.be.empty;
            done();
        }).catch(err=>{
            console.log(err);
            assert(false,err);
            done();
        });
    });
}).slow(500);

    
 describe('Manager GET', ()=>{
    it('Should return all tasks for manager', (done)=>{
        request(app)
        .get('/tasks')
        .set('Cookie', auth_token).expect(200).then(res => {
            expect(res.body).to.be.an('array');
            tasks = res.body;
            assert(true, res.body);
            done();
        }).catch(err=>{
            console.log(err);
            assert(false, `Manager Get Tasks: ${err}`);
            done();
        });
    });
});           
    
describe('Manager DELETE', ()=>{
    it('Should delete task with id', (done)=>{
        request(app)
        .delete('/tasks')
        .send({taskId:tasks[0].id})
        .set('Cookie', auth_token).expect(200).then((res)=>{
            expect(res.body).to.be.an('boolean','Task was deleted');
            assert(true, res.body);
            done()
        }).catch(err=>{
            console.log(err)
            assert(false, `Manager Delete Task: ${err}`);
            done();
        });
    });
})

