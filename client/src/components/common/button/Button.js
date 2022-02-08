import React from 'react';
import './button.css';
function Button({text, onClick, style}) {
  return (
    <div>
        <button 
            className='btn'
            onClick={onClick}
            style={style}
            >
                {text}
        </button>
    </div>
  );
}

export default Button;
