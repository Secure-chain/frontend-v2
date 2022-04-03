import React from 'react';
import SupplyChainCard from '../../components/supplyChainCard/SupplyChainCard';
import Header from '../../components/header/Header';
import OwnedSupplyChainsStyle from './OwnedSupplyChains.css'
import {useEffect, useHistory,useState} from 'react'
import {Card, Button} from 'react-bootstrap'
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
              res.data.reverse()
          );
          console.log(res.data);
      }).catch((err) => {
          console.log(err)
      })
  }, [])

  // const reverse_array = () => {
  //   setownedsupplychain(prevState => {
  //       const arr = prevState;
  //       return arr.reverse();
  //   })
// }

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

export default OwnedSupplyChains;
