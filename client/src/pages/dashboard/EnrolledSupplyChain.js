import React from 'react';
import SupplyChainCard from '../../components/supplyChainCard/SupplyChainCard';
import Header from '../../components/header/Header';
import {useEffect, useHistory,useState} from 'react'
import axios from 'axios';
import { initObject } from '../../components/initVariables/initObject';

function EnrolledSupplyChains() {

//   let history = useHistory();

  let token = initObject().token
  const [enrolledsupplychain, setenrolledsupplychain] = useState([]);
  
  useEffect(() => {
      axios.get('https://securechain-backend.herokuapp.com/enrolledsupplychain/',
      {
        headers: 
        {
          Authorization: `Token ${token}`
        }
      }).then((res) => {
            setenrolledsupplychain(
              res.data.reverse()
            );
            console.log(res.data);
          }).catch((err) => {
              console.log(err)
          })
      }, [])

  return( 
    <div>
        <Header title='Enrolled Supply Chains' /> 
        <div className='right-window'>
          <div className='column'>
            {enrolledsupplychain.map((supplychain, key)=>{
                return(
                    <div className='row'>
                      <SupplyChainCard 
                      title={supplychain.name}
                      date={supplychain.date_created}
                      description={supplychain.details}
                      />
                    </div> 
                )}
            )}
          </div>
        </div>
    </div>
  );
}

export default EnrolledSupplyChains;
