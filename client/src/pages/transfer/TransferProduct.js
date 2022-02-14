import React, { useState, useEffect } from 'react'
import TransferProductContent from '../../components/transferProduct/TransferProductContent'
import Header from '../../components/header/Header'

function TransferProduct({ getProductName, productsInSupplyChain, currentBatchesInOwnership, currentUnitsInOwnership, transferProduct, requestTransfer }) {
    return (
        <div>
            <Header title='Transfer Product' />
            <TransferProductContent
                getProductName={getProductName}
                productsInSupplyChain={productsInSupplyChain}
                currentBatchesInOwnership={currentBatchesInOwnership}
                currentUnitsInOwnership={currentUnitsInOwnership}
                transferProduct={transferProduct}
                requestTransfer={requestTransfer}
            />
        </div>
    );
}

export default TransferProduct;