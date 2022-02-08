import React from 'react';
import SupplyChainCard from '../../components/supplyChainCard/SupplyChainCard';
import Header from '../../components/header/Header';
import OwnedSupplyChainsStyle from './OwnedSupplyChains.css'

function OwnedSupplyChains() {
  return( 
    <div>
        <Header title='Owned Supply Chains' /> 
        <div className='right-window'>
            <SupplyChainCard 
            title='Vaccine Supply Chain'
            date='17th December 2021'
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book. It has survived not only five centuries, but also the leap into
             electronic typesetting, remaining essentially unchanged. It was popularised in 
             the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
             and more recently with desktop publishing software like Aldus PageMaker including 
             versions of Lorem Ipsum."
            />
            {/* <SupplyChainCard/>  */}
        </div>
        
    </div>
  );
}

export default OwnedSupplyChains;
