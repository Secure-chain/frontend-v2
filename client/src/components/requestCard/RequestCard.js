import React from 'react';
import RequestCardStyle from './RequestCard.css'
import Button from '../common/button/Button';

function RequestCard({date,sender,supplychain,product,batches}) {
  return( 
    <div className='request-card'>
        <div className='request-card-title'>
            <p>{sender} wants to send you {batches} batches of {product}!</p>
        </div>
        <div className='request-card-date'>
            {date}
        </div>
        <div className='request-card-divider'>
            
        </div>
        <div className='request-card-item'>
            <p>Sender's Name : {sender}</p>
        </div>
        <div className='request-card-item'>
            <p>Supply Chain : {supplychain}</p>
        </div>
        <div className='request-card-item'>
            <p>Product : {product}</p>
        </div>
        <div className='request-card-item'>
            <p>Number of Batches : {batches}</p>
        </div>
        <div className='request-card-request'>
            <div className='request-card-request-text'>
                <p>Do you want to accept this incoming transaction ?</p>
            </div>
            
            <div className='request-card-accept'>
                <Button text = 'Accept'/> 
            </div>
            <div className='request-card-reject'>
                <Button text = 'Reject'/> 
            </div>
            
        </div>
    </div>
    );
}

export default RequestCard;
