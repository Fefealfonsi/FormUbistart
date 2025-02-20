import React, {useState}from "react"
import Formulario from './components/Formulario/Formulario'
import {AppContainer, LogoContainer, Logo, Title, Message} from "./appStyle"
import logotipo from "./images/logotipo.png"

function App() {

  const [dados, setDados] = useState({cep:"",city:"", email:"",id:"", name:"", neighborhood:"", service:"", state:"", street:"", user_cep:"" })
  const [exibe, setExibe] = useState(false)
  const [message, setMessage] = useState("")

  console.log("DADOS",dados);

  return (
    <AppContainer>
      <LogoContainer>

      <Title>Formulários de Cadastro</Title>
      <Logo src={logotipo} alt="" />
      </LogoContainer>
      <Message>{message}</Message>

     <Formulario
     dados={dados}
     setDados={setDados}
     message={message} 
     setMessage={setMessage}
     
     />

     <button onClick={()=>{setExibe(!exibe)}}>{exibe ? "Esconder Cadastro":"Mostrar Cadastro"}</button>
     {dados===undefined&& setDados({cep:"",city:"", email:"",id:"", name:"", neighborhood:"", service:"", state:"", street:"", user_cep:"" })}
     
     {exibe && <div>
    
    <p>NOME: {dados.name}</p>
    <p>EMAIL:{dados.email}</p>
    <p>CEP:{dados.cep}</p>
    <p>RUA:{dados.street}</p>
    <p>BAIRRO: {dados.neighborhood}</p>
    <p>CIDADE: {dados.city},</p>
    <p>ESTADO:{dados.state}</p>
  </div>}
     
    </AppContainer>
  );
}

export default App;
