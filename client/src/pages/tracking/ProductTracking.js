import React from 'react';
import Header from '../../components/header/Header.js';
import TrackingContent from '../../components/trackingContent/TrackingContent';

function ProductTracking({ getProductHistory }) {
    return (
        <div>
            <Header title='Product Tracking' />
            <TrackingContent 
                getProductHistory={getProductHistory}
            />
        </div>
    );
}

export default ProductTracking;