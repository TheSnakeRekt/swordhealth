import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export class AuthenticationHelper {


    static generateId(){
        return crypto.randomBytes(16).toString('hex');
    }

    static async authenticate(inputpassword: string, instancepassword: string){
        try {
            return await bcrypt.compare(inputpassword, instancepassword);
        }catch(error){
            console.error(error)
        }
        return false;
    }

    static async createPassword(inputpassword: string){
        try {
            return await bcrypt.hash(inputpassword, 12)  
        } catch (error) {
            console.error(error)
        }
        return '';
    }
}