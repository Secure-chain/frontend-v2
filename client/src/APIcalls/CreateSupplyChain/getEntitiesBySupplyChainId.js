import React from 'react'
import { initObject } from "../../components/initVariables/initObject"
import axios from "axios"

const getEntitiesBySupplyChainId = (supplyChain) => {
    try{
        const response = axios.get(`${initObject().initVariables}/entity/?supply_chain=${supplyChain}`, {
        headers: {
            Authorization: `Token ${initObject().token}`,
        },
    })
    return response.data
    }
    catch(error){
        console.error(error.response)
    }
}

export default getEntitiesBySupplyChainId