import React from 'react';
import SupplyChainDetails from '../createSupplyChain.js/SupplyChainDetails';
import EntityCreation from '../createSupplyChain.js/EntityCreation';
import './content.css';
function Content() {
const [tab, setTab] = React.useState(1);
  return (
  <div className='right-window'>
    <div className='create-chain-container'>
        <div className='tab-container'>
            <div className='tab-group'>
                <div className={tab === 1 ? 'tab-active' : 'tab'} onClick={() => setTab(1)}>1</div>
                <div className='tab-text'>Basic Details</div>
            </div>
            <div className='tab-group'>
                <div className={tab === 2 ? 'tab-active' : 'tab'} onClick={() => setTab(2)}>2</div>
                <div className='tab-text'>Entity and Flow Creation</div>
            </div>
        </div>
        <div className='tab-content'>
            {tab === 1 && <SupplyChainDetails />}
            {tab === 2 && <EntityCreation />}
        </div>
        {/* Call different components based on request */}
    </div>
  </div>
  );
}

export default Content;
