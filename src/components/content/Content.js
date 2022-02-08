import React, { useEffect, useState } from 'react';
import SupplyChainDetails from '../createSupplyChain.js/SupplyChainDetails';
import EntityCreation from '../createSupplyChain.js/EntityCreation';
import './content.css';
function Content() {
const [tab, setTab] = useState(1);
const [id,setId] = useState(0);
  return (
  <div className='right-window' style={tab == 2 ? {height : 'max-content', paddingTop : '10px'} : null}>
    <div className='create-chain-container' >
        <div className='tab-container'>
            <div className='tab-group'>
                <div className={tab === 1 ? 'tab-active' : 'tab'} onClick={() => setTab(1)}>1</div>
                <div className='tab-text'>Basic Details</div>
            </div>
            <div className='tab-group'>
                <div className={tab === 2 ? 'tab-active' : 'tab'}  onClick={() => setTab(2)}>2</div>
                <div className='tab-text'>Entity and Flow Creation</div>
            </div>
        </div>
        <div className='divider'></div>
        <div className='tab-content'>
            {tab === 1 &&
             <SupplyChainDetails 
                setId={(data)=>setId(data)} 
                handleTabChange={(data)=>setTab(data)}
            />}
            {tab === 2 && <EntityCreation />}
        </div>
        {/* Call different components based on request */}
    </div>
  </div>
  );
}

export default Content;
