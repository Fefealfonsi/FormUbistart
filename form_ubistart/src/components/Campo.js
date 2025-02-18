import {CampoContainer} from "./style"

function Campo({type, onHandleInput, name,value, text, pattern, title }) {

    return (
      <>
       <CampoContainer
       type={type}
       name={name}
       value={value}
       placeholder={text}
       onChange={onHandleInput}
       pattern={pattern}
       title={title}
       required
       />
      </>
    );
  }

  export default Campo;