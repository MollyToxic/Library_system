import { useEffect, useState } from "react";

function Input(props) {
  

  function onInputChange(event) {
 
    props.onChange(event.target.value);
  }

  
  return (
    <>
      <label>
        {props.title}
        <input value={props.inputValue} onChange={onInputChange}></input>
      </label>

    </>
  );
}

export default Input;
