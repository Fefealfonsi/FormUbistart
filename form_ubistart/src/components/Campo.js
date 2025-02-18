function Campo({type, onHandleInput, name, text }) {

    return (
      <>
       <input 
       type={type}
       name={name}
       placeholder={text}
       onChange={onHandleInput}


       />
      </>
    );
  }

  export default Campo;