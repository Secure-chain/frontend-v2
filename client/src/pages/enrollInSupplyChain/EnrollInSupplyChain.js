import React, { useState, useEffect } from 'react'
import SupplyChainEnrollContent from '../../components/supplyChainEnroll/SupplyChainEnrollContent'
import Header from '../../components/header/Header'

function EnrollInSupplyChain() {
    return(
        <div>
            <Header title='Enroll in a Supply Chain' />
            <SupplyChainEnrollContent />
        </div>
    );
}

export default EnrollInSupplyChain;