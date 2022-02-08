import React from 'react';
import './input.css';
function Input({type, placeholder, value, onChange, onBlur, onFocus, style}) {
  return (
  <div>
    <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={style}
        onBlur={onBlur}
        onFocus={onFocus}
        className='input-field'
     />
  </div>
  )
  ;
}

export default Input;
