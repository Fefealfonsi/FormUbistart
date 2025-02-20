import { UserDatabase } from "../database/UserDatabase"
import {UserAddressOutputDTO, MessageOutputDTO, UserDB, AddressDB, CreateUserDB } from "../Interfaces/types"
import axios from "axios"
import { isModuleNamespaceObject } from "util/types"


export class UserBusiness{
    getUser = async():Promise<UserAddressOutputDTO>=>{
        const database = new UserDatabase() 
        const result = database.getUser() 
        return result


    }
    getUserByEmail = async(email:string):Promise<UserAddressOutputDTO>=>{
        const database = new UserDatabase() 

        if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi)) {
            throw new Error("O formato do email não é valido")
        }
        const result = database.getUserByEmail(email) 
        console.log(result);
        
        return result


    }
    createUser = async(input:CreateUserDB)=>{

        const {name, email, user_cep} = input
        const id = String(Date.now())

        const database = new UserDatabase() 
        if (!name.match(/^([áàâãéèêíïóôõöúçñ ]|[a-z]\p{M}?)+$/iu)) {
            throw new Error("Nome deve conter apenas letras, verifique!")
        }
        if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi)) {
            throw new Error("O formato do email não é valido")
        }
        if (isNaN(Number(user_cep))) {
            throw new Error("Verifique se há apenas números no seu cep")
        }
        if (user_cep.length !== 8) {
            throw new Error("Cep deve ter 8 números")
        }

        const users= await database.findUser()
      
        
        for (const user of users) {
            if (email === user.email) {
                throw new Error("email já foi cadastrado")
            }
        }

        const cepVerify= await axios.get(`https://brasilapi.com.br/api/cep/v1/${user_cep}`)
            .then((res) => { return res.data })
            .catch((err) => { throw new Error("Cep não encontrado") })

        const addresses = await database.findAddress()
      
        

        const addressExiste = addresses.find((address: AddressDB) => address.cep === cepVerify.cep)


        !addressExiste && await database.insertAddress({
            cep: cepVerify.cep,
            state: cepVerify.state,
            city: cepVerify.city,
            neighborhood: cepVerify.neighborhood,
            street: cepVerify.street,
            service: cepVerify.service
        })

        const newUser: UserDB = {
            id: id,
            name: name,
            email: email,
            user_cep: user_cep
        }
        //Database
       
       await database.insertUser(newUser)


    }
    updateUser = async(input:CreateUserDB, idToEdit:string)=>{

        const database = new UserDatabase() 
        const [user]= await database.findUserById(idToEdit) 
   
      
        if (input.name && !input.name.match(/^([áàâãéèêíïóôõöúçñ ]|[a-z]\p{M}?)+$/iu)) {
            throw new Error("Nome deve conter apenas letras, verifique!")
        }
        if (input.email &&!input.email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi)) {
            throw new Error("O formato do email não é valido")
        }
        if (input.user_cep && isNaN(Number(input.user_cep))) {
            throw new Error("Verifique se há apenas números no seu cep")
        }
        if (input.user_cep && input.user_cep.length !== 8) {
            throw new Error("Cep deve ter 8 números")
        }

        const users= await database.findUser()
     
        
        for (const user of users) {
            if (input.email === user.email) {
                throw new Error("email já foi cadastrado")
            }
        }

        input.user_cep && await axios.get(`https://brasilapi.com.br/api/cep/v1/${input.user_cep}`)
            .then((res) => { return res.data })
            .catch((err) => { throw new Error("Cep não encontrado") })
        
        if (user) {

            const dataUpdate={
                    name: input.name || user.name,
                    email: input.email || user.email,
                    user_cep: input.user_cep|| user.user_cep
            }


            await database.updateUser(dataUpdate, idToEdit)

        } else {
            
            return ("'id' não encontrada")
        }


    }
}