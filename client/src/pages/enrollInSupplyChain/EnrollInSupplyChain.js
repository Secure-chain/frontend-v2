import React, { useState, useEffect } from 'react'
import enrollInSupplyChain from './enrollInSupplyChain.css'

function EnrollInSupplyChain() {
    const [tab, setTab] = useState(1);
    const [id, setId] = useState(0);
    return(
        <div className='right-window' style={tab == 2 ? { height: 'max-content', paddingTop: '10px' } : { height: 'max-content', paddingTop: '10px' }}>
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
                            setId={(data) => setId(data)}
                            handleTabChange={(data) => setTab(data)}
                        />}
                    {tab === 2 && <EntityCreation />}
                </div>
                {/* Call different components based on request */}
            </div>
        </div>
    );
}

export default EnrollInSupplyChain;