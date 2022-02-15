import React, { useState, useEffect } from 'react'
import line from '../../media/line.png'
import productHistory from './productHistory.css'

function ProductHistory({ batchHistory}) {

    return (
        <div className='product-history'>
            {
                batchHistory &&
                <div className='product-history-container'>
                    {
                        batchHistory.map((e) => {
                            let block;
                            if (e.description === "Transfer Requested") {
                                block = e.description + " by " + e._senderName + " to " + e._receiverName;
                            }
                            else if (e.description === "Product Created") {
                                block = e.description + " by " + e._senderName;
                            }
                            else if (e.description === "Transfer Request Accepted") {
                                block = e.description + " by " + e._receiverName;
                            }
                            else {
                                block = e.description + " to " + e._receiverName;
                            }
                            return (
                                <div className='tracking-content' key={e.timestamp}>
                                    <div className='line' style={{}}>
                                        
                                    </div>
                                    <div>
                                        <div className='product-history-date'>
                                            {e.timestamp}
                                        </div>
                                        <div className='product-history-info'>
                                            {block}
                                            <br/>
                                            Number of units:- {e.unitsInBatch}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            }
        </div>
    );
}
export default ProductHistory;
