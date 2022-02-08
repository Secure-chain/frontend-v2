import React, { useState, useEffect } from 'react'
import Button from '../common/button/Button'
import Input from '../common/input/Input'
import trackingContent from './trackingContent.css'

function TrackingContent() {

    const [productNumber, setProductNumber] = useState("")
    const [supplyChainID, setSupplyChainID] = useState("")
    const [batchID, setBatchID] = useState("")

    const handleSubmit = () => {
        
    }

    return(
        <div className='right-window'>
            <div className='create-chain-container' >

            </div>
        </div>
    );
}

export default TrackingContent;