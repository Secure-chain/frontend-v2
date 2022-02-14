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
              res.data
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
            {enrolledsupplychain.map((supplychain, key)=>{
                return(
                    <SupplyChainCard 
                    title={supplychain.name}
                    date='17th December 2021'
                    description={supplychain.details}
                    />
                )}
            )}
        </div>
    </div>
  );
}

export default EnrolledSupplyChains;
