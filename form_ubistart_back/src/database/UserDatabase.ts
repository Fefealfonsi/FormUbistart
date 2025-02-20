import {BaseDatabase} from "../database/BaseDatabase"
import {UserAddressOutputDTO, UserDB, AddressDB, CreateUserDB} from "../Interfaces/types"

export class UserDatabase extends BaseDatabase{
    public static TABLE_USER = "user"
    public static TABLE_ADDRESS = "address"
    public async getUser ():Promise<UserAddressOutputDTO>{

        const result:UserAddressOutputDTO = await BaseDatabase.connection.raw(`
        SELECT * FROM ${UserDatabase.TABLE_ADDRESS}
        INNER JOIN ${UserDatabase.TABLE_USER}
        ON user.user_cep = address.cep;
    `)
        return result
    }

    public async insertUser(parameter:UserDB){
        await BaseDatabase.connection(UserDatabase.TABLE_USER).insert(parameter)
    }
    public async insertAddress(parameter:AddressDB){
        await BaseDatabase.connection(UserDatabase.TABLE_ADDRESS).insert(parameter)
    }

    public async findUser(){
        
        const result = await BaseDatabase.connection.select("*").from(UserDatabase.TABLE_USER)
        return result
    }
    public async findUserById(idToEdit:string){
       
        const result = await BaseDatabase.connection.select("*").from(UserDatabase.TABLE_USER).where({ id: idToEdit })
        return result
    }

    public async findAddress(){

        const result = await BaseDatabase.connection.select("*").from(UserDatabase.TABLE_ADDRESS)
        return result
        
    }
    public async updateUser(parameter:CreateUserDB, idToEdit:string){

        await BaseDatabase.connection.update(parameter).from(UserDatabase.TABLE_USER).where({ id: idToEdit })
         
    }
}