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
                        batchHistory.map((e,index) => {
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
                                    <div className='path-wrapper'>
                                        <div className={index !== batchHistory.length - 1 ? 'circle' : 'black-circle'}></div>
                                        <div className='line' style={index === batchHistory.length - 1 ? {visibility:'hidden'} : {}} > </div>
                                    </div>
                                    <div className='info-container' >
                                        <div className='product-history-date' style={index === batchHistory.length - 1 ? {color:'#000'} : {}}>
                                            {e.timestamp}
                                        </div>
                                        <div className='product-history-info' style={index === batchHistory.length - 1 ? {color:'#000'} : {}}>
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
