import React, {useState}from "react"
import Campo from '../Campo/Campo';
import { FormContainer} from "./style"
import axios from "axios";

function Formulario({setMessage, getUserByEmail, exibe, setExibe}) {
    const [inputs, setInputs]=useState({name:"", email:"", cep:""})
    
    const onHandleInput=(event)=>{
        const {name,value} = event.target
        setInputs({...inputs,[name]:value})
      }
      
      const userRegister=(body)=>{
        axios.post("http://localhost:3003/user", body)
        .then((res)=>{setMessage(res.data);})
        .catch((err)=>{setMessage(err.response.data);})
      }
      

      const body={
        name:inputs.name,
        email:inputs.email,
        user_cep:inputs.cep
      }
      

      async function cadastrar(event){
        event.preventDefault()
         userRegister(body)
       
         setTimeout(() => {
          getUserByEmail(body.email)
          setExibe(!exibe)
          setInputs({name:"", email:"", cep:""})
         }, 1000);
        
      }
    
       

    return (
      <FormContainer onSubmit={cadastrar}>
        <Campo
        type={"text"}
        onHandleInput={onHandleInput}
        name={"name"}
        value={inputs.name}
        text={"Nome completo"}
        //pattern={"/^[A-Za-záéíóúãõâêîôûàèìòùç]+$/"}
        //title={"Letras de A a Z, não aceita números"}
        />
        <Campo
        type={"email"}
        onHandleInput={onHandleInput}
        name={"email"}
        value={inputs.email}
        text={"email"}
        //pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"}
        //title={"Letras de A a Z, mínimo de 3 caracteres"}
        />
        <Campo
        type={"number"}
        onHandleInput={onHandleInput}
        name={"cep"}
        value={inputs.cep}
        text={"digite seu CEP"}
        min="8"
        />

        <Campo type={"submit"} />

      </FormContainer>
    );
  }

  export default Formulario;