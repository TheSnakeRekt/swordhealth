import { assert, expect } from "chai";
import Container from "typedi";
import { Database } from "database/database";
import { delay } from './utils/delay.test.utils';

require('dotenv').config();

import 'reflect-metadata';
import { AuthenticationHelper } from "services/utils/authentication.utils";

const database = Container.get<Database>(Database);

const users = [{
    name : 'Jorge Guimaraes',
    email : 'jorgeradasilva@gmail.com',
    role: 'MANAGER',
    password: ''
},{
    name : 'Rafael Silva',
    email : 'solidusdex4@gmail.com',
    role: 'TECHNICIAN',
    password: ''
}]



describe('Database connection',()=>{   
    it('Should Connect', (done)=>{
            database.getSequelize().authenticate().then(()=>{
                assert(true,"Database connected");
                done()
           }).catch(err=>{
                console.error(err)
                assert(false, "Database connection failed");
                done();
           }); 
    });
    delay(10000, 'Waiting for database tables').slow(20000);
});



describe('Test Objects: Users', ()=>{
    it('Should insert Users', (done)=>{
            for(let i = 0; i < users.length; i++){
                AuthenticationHelper.createPassword(`PasswordTeste_${i}`).then((val=>{
                    users[i].password = val;
                    database.getUserRepository().create(users[i]).then((res)=>{
                        expect(res.get()).to.have.property('id');
                    }).catch(err=>{
                        assert(false, err);
                        done();
                    });
                })).catch(err=>{
                    console.error(err)
                    assert(false, err);
                    done();
                });
            }
            assert(true);
            done();     
    });
});


