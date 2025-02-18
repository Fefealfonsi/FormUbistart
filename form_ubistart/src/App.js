import './App.css';
import React, {useState }from "react"
import Campo from './components/Campo';
function App() {

  const [inputs, setinputs]=useState({nome:"", email:"", cep:""})



  const onHandleInput=(event)=>{
    const {name,value} = event.target
    console.log(name, value);
    setinputs({...inputs,[name]:value})

  }

  return (
    <section>
     <form action="">
        <Campo
        type={"text"}
        onHandleInput={onHandleInput}
        name={"nome"}
        text={"Nome completo"}
        />
        <Campo
        type={"email"}
        onHandleInput={onHandleInput}
        name={"email"}
        text={"email"}
        />
        <Campo
        type={"number"}
        onHandleInput={onHandleInput}
        name={"cep"}
        text={"digite seu cep"}
        />

        <input type="submit" />
     </form>
    </section>
  );
}

export default App;
