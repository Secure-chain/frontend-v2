import React, { useState, useEffect } from 'react'
import TransferProductContent from '../../components/transferProduct/TransferProductContent'
import Header from '../../components/header/Header'

function TransferProduct() {
    return (
        <div>
            <Header title='Transfer Product' />
            <TransferProductContent />
        </div>
    );
}

export default TransferProduct;