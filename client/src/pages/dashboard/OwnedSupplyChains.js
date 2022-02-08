import React from 'react';
import SupplyChainCard from '../../components/supplyChainCard/SupplyChainCard';
import Header from '../../components/header/Header';
import OwnedSupplyChainsStyle from './OwnedSupplyChains.css'
import {useEffect, useHistory,useState} from 'react'
import axios from 'axios';
import { initObject } from '../../components/initVariables/initObject';

function OwnedSupplyChains() {

  // let history = useHistory();

  let token = initObject().token
  const [ownedsupplychain, setownedsupplychain] = useState([]);

  useEffect(() => {
      axios.get('https://securechain-backend.herokuapp.com/mysupplychain/',
      {
        headers: 
        {
          Authorization: `Token ${token}`
        }
      }).then((res) => {
            setownedsupplychain(
              res.data
          );
          console.log(res.data);
      }).catch((err) => {
          console.log(err)
      })
  }, [])

  return( 
    <div>
        <Header title='Owned Supply Chains' /> 
        <div className='right-window'>
          <div className='column'>
            {ownedsupplychain.map((supplychain)=>{
                return(
                  <div className='row'>
                    <SupplyChainCard 
                      title={supplychain.name}
                      date='17th December 2021'
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

export default OwnedSupplyChains;
