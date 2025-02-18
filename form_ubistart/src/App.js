import React, {useState}from "react"
import Campo from './components/Campo';
import {AppContainer, FormContainer, Logo} from "./appStyle"
import logotipo from "./images/logotipo.png"
import axios from "axios";



function App() {

  const [inputs, setInputs]=useState({nome:"", email:"", cep:""})
  const [dados, setDados] = useState({})
  const [endereco, setEndereco] = useState("")

  

  const onHandleInput=(event)=>{
    const {name,value} = event.target
    setInputs({...inputs,[name]:value})
  }

  const buscarCep=(cep)=>{
    axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
    .then((res)=>{setEndereco(res.data);})
    .catch((err)=>{console.log(err.response.data.message);})
  }
 
  const enviar=(event)=>{
   event.preventDefault()
   buscarCep(inputs.cep)
   setDados(inputs)
   


   setInputs( {nome:"", email:"", cep:""})
  }

  
 console.log(dados);
 console.log(endereco.street);


  return (
    <AppContainer>

     <FormContainer onSubmit={enviar}>
      <Logo src={logotipo} alt="" />
        <Campo
        type={"text"}
        onHandleInput={onHandleInput}
        name={"nome"}
        value={inputs.nome}
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
        //pattern={"^\d{8}$"}
        //title={"O cep deve ter 8 caracteres"}
        />

        <Campo type={"submit"} />
     </FormContainer>
     {endereco.cep?
     <div>
       <p>{dados.nome}</p>
       <p>{dados.email}</p>
       <p>{endereco.cep}</p>
       <p>{endereco.state}</p>
       <p>{endereco.city}</p>
       <p>{endereco.neighborhood}</p>
       <p>{endereco.street}</p>
       
     </div>: <h3>Cep inválido</h3>}
    </AppContainer>
  );
}

export default App;
