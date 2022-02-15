import React, { useState, useEffect } from 'react'
import Button from '../common/button/Button'
import Input from '../common/input/Input'
import ProductHistory from './ProductHistory'
import trackingContent from './trackingContent.css'

function TrackingContent({ getProductHistory }) {

    const [productNumber, setProductNumber] = useState("")
    const [supplyChainID, setSupplyChainID] = useState("")
    const [batchID, setBatchID] = useState("")
    const [batchHistory, setBatchHistory] = useState([])
    const [batchHistorySuccess, setBatchHistorySuccess] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setBatchHistorySuccess(true)
        console.log("inside tracking")
    
        if(batchID !== "") {
            getProductHistory(parseInt(supplyChainID), productNumber, parseInt(batchID)).then((res) => {
                setBatchHistory(res);
            });
        }
        console.log("batch history", batchHistory)
    }

    return(
        <div className='right-window'>
            <div className='create-chain-container'>
                <form className='input-container' onSubmit={handleSubmit}>
                    <div className='input-box'>
                        <Input placeholder='Product Number' onChange={(e) => {setProductNumber(e.target.value) }} style={{ width: '250px' }} />
                    </div>
                    <div className='input-box'>
                        <Input placeholder='Supply Chain ID' onChange={(e) => { setSupplyChainID(e.target.value) }} style={{ width: '150px' }} />
                    </div>
                    <div className='input-box'>
                        <Input placeholder='Batch ID' onChange={(e) => { setBatchID(e.target.value) }} style={{ width: '150px' }} />
                    </div>
                    <div className='input-box'>
                        <Button text='Track History' onClick={handleSubmit} style={{ width: '150px' }} />
                    </div>
                </form>
                <ProductHistory
                    batchHistory={batchHistory}
                />
            </div>
        </div>
    );
}

export default TrackingContent;