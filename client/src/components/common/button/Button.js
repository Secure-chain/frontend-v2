import React from 'react';
import './button.css';
function Button({text, onClick, style, className,type}) {
  return (
    <div >
        <button 
            className={`btn ${className}`}
            onClick={onClick}
            style={style}
            type={type}
            >
                {text}
        </button>
    </div>
  );
}

export default Button;
