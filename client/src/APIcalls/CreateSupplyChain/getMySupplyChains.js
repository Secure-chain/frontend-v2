import axios from 'axios'
import React from 'react'
import { initObject } from '../../components/initVariables/initObject'
const getMySupplyChains = async() => {
    try{
        const response = await axios.get(`${initObject().initVariables}/mysupplychain/`, {
            headers: {
                Authorization: `Token ${initObject().token}`,
            },
        })
    return response
    }
    catch(error){
        console.error(error.response)
    }
}

export default getMySupplyChains