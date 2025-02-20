export class User{
    constructor(
       private id: string,
       private name: string,
       private email: string,
       private user_cep: string,

    ){}
    get ID(){
        return this.id
    }
    get NAME(){
        return this.id
    }
    get EMAIL(){
        return this.id
    }
    get CEP(){
        return this.id
    }
    set ID(value:string){
         this.id = value
    }
    set NAME(value:string){
        this.name = value
   }
    set EMAIL(value:string){
        this.email = value
   }
    set CEP(value:string){
        this.user_cep = value
   }
}