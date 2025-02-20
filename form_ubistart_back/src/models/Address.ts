export class Address{
    constructor(
        private cep: string,
        private state: string,
        private city: string,
        private neighborhood: string,
        private street: string,
        private service: string
    ){}
    get CEP(){
        return this.cep
    }
    get STATE(){
        return this.state
    }
    get CITY(){
        return this.city
    }
    get NEIGHBORHOOD(){
        return this.neighborhood
    }
    get STREET(){
        return this.street
    }
    get SERVICE(){
        return this.service
    }
   
    
}