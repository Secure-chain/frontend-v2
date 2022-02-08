import React, { useState, useEffect } from 'react'
import Button from '../common/button/Button'
import Input from '../common/input/Input'
import ProductHistory from './ProductHistory'
import trackingContent from './trackingContent.css'

function TrackingContent() {

    const [productNumber, setProductNumber] = useState("")
    const [supplyChainID, setSupplyChainID] = useState("")
    const [batchID, setBatchID] = useState("")
    const [batchHistory, setBatchHistory] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

    return(
        <div className='right-window'>
            <div className='create-chain-container'>
                <form className='input-container' onSubmit={handleSubmit}>
                    <div className='input-box'>
                        <Input placeholder='Product Number' style={{ width: '250px' }} />
                    </div>
                    <div className='input-box'>
                        <Input placeholder='Supply Chain ID' style={{ width: '150px' }} />
                    </div>
                    <div className='input-box'>
                        <Input placeholder='Batch ID' style={{ width: '150px' }} />
                    </div>
                    <div className='input-box'>
                        <Button text='Track History' style={{ width: '150px' }} />
                    </div>
                </form>
                <ProductHistory/>
            </div>
        </div>
    );
}

export default TrackingContent;