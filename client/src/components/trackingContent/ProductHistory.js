import React, { useState, useEffect } from 'react'
import productHistory from './productHistory.css'

function ProductHistory({ batchHistory}) {

    return (
        <div className='product-history'>
            <div className='product-history-container'>
                <div className='product-history-date'>
                    Monday, 20 December, 2021
                </div>
                <div className='product-history-info'>
                    Krishna Manufacturer manufactured 20 batches of Covishield
                </div>
            </div>
        </div>
    );
}
export default ProductHistory;
