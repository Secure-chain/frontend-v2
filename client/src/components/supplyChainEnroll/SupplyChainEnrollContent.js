import React, { useState, useEffect } from 'react'
import SelectSupplyChain from './SelectSupplyChain'
import RequestParticipation from './RequestParticipation'
import supplyChainEnrollContent from './supplyChainEnrollContent.css'

function SupplyChainEnrollContent() {
    const [tab, setTab] = useState(1);
    const [selectedSupplyChain, setSelectedSupplyChain] = useState(0);
    const [entities, setEntities] = useState([]);
    return (
        <div className='right-window'>
            <div className='create-chain-container' >
                <div className='tab-container'>
                    <div className='tab-group'>
                        <div className={tab === 1 ? 'tab-active' : 'tab'} onClick={() => setTab(1)}>1</div>
                        <div className='tab-text'>Select Supply Chain</div>
                    </div>
                    <div className='tab-group'>
                        <div className={tab === 2 ? 'tab-active' : 'tab'} onClick={() => setTab(2)}>2</div>
                        <div className='tab-text'>Request Participation</div>
                    </div>
                </div>
                <div className='divider'></div>
                <div className='tab-content'>
                    {tab === 1 &&
                        <SelectSupplyChain
                            handleSupplyChainSelection={(id) =>  setSelectedSupplyChain(id)}
                            handleTabChange={(data) => setTab(data)}
                        />}
                    {tab === 2 && <RequestParticipation 
                                    selectedSupplyChain={selectedSupplyChain}
                                    handleEntitiesDisplay={(data)=>setEntities(data)}
                                    />}
                </div>
                {/* Call different components based on request */}
            </div>
        </div>
    );
}

export default SupplyChainEnrollContent;