import React from 'react';
import Button from '../common/button/Button';
import SupplyChainCardStyle from './SupplyChainCard.css'

function SupplyChainCard({title,date,description}) {
  return( 
        <div className='supply-chain-card'>
            <div className='supply-chain-card-title'>
                <p>{title}</p>
            </div>
            <div className='supply-chain-card-date'>
                {date}
            </div>
            <div className='supply-chain-card-divider'>
                <hr></hr>
            </div>
            <div className='supply-chain-card-description'>
                {description}
            </div>
            <div className='supply-chain-card-button'>
                <Button text = 'View'/> 
            </div>
            
        </div>
  );
}

export default SupplyChainCard;
