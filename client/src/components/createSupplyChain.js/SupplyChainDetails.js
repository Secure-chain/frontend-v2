import React, { useState } from 'react';
import Input from '../common/input/Input'
import Button from '../common/button/Button';
import './supplyChainDetails.css';
import { postSupplyChainDetails } from '../../APIcalls/postSupplyChainDetails';

function SupplyChainDetails({setId, handleTabChange, setSupplyChain}) {
  const [supplyChainDetails, setSupplyChainDetails] = useState({
    name: '',
    details: '',
  });
  const handleNext = async() => {
    const supplyChainData =  await postSupplyChainDetails(supplyChainDetails);
    setSupplyChain(supplyChainData);
    setId(supplyChainData?.id);
    handleTabChange(2);
  }
  return (
  <div>
    <div className='supply-chain-container'>
      <div className='supply-chain-header'>
        Supply Chain Details
      </div>
      <div className='supply-input-container'>
        <div className='input-label'>
          Name
        </div>
        <Input 
          type={'text'} 
          value={supplyChainDetails.name} 
          onChange={(e)=>{
          setSupplyChainDetails({...supplyChainDetails, name: e.target.value})
          }}
          style={{width: "100%",}} 
        />
        <div className='input-label'>
          Description
        </div>
        <Input 
          type={'text'}
          value={supplyChainDetails.description}
          onChange={(e)=>{
            setSupplyChainDetails({...supplyChainDetails, details: e.target.value})
          }
          }
          style={{width: "100%", height: "100px",marginBottom: "20px"}}
        />
      </div>
      <div className = {'next-btn'}>
        <Button text={"Next Page"}  onClick={handleNext} />
      </div>     
    </div>
  </div>
  )
  ;
}

export default SupplyChainDetails;
