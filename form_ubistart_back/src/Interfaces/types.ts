import { User} from "../models/User"
import { Address } from "../models/Address"


export interface UserDB{
    id: string,
    name: string,
    email: string,
    user_cep: string,
}
export interface AddressDB{
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    service: string
}
export interface CreateUserDB{
  
    name: string,
    email: string,
    user_cep: string,
}

export interface UserAddressOutputDTO{
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    service: string,
    id: string,
    name: string,
    email: string,
    user_cep: string,

}
export interface MessageOutputDTO{
   message: string
}