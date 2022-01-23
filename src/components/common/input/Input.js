import React from 'react';

function Input({type, placeholder, value, onChange, onBlur, onFocus, style}) {
  return (
  <div>
    <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        style={style}
     />
  </div>
  )
  ;
}

export default Input;
