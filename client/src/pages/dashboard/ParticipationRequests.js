import React from 'react';
import ParticipationRequestsStyle from './ParticipationRequests.css'
import Header from '../../components/header/Header';
import RequestCard from '../../components/requestCard/RequestCard';

function ParticipationRequests() {
  return( 
    <div>
        <Header title='Participation Requests' /> 
        <div className='right-window'>
            <RequestCard
            sender='Siddhant Truckers'
            date='Mon Jul 18, 2021 12:00 PM IST'
            product='Syringe'
            batches='100'
            >
            
            </RequestCard>
        </div>

    </div>
  );
}

export default ParticipationRequests;
