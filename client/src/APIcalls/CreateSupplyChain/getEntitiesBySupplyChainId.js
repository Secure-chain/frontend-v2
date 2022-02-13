import React from 'react'
import { initObject } from "../../components/initVariables/initObject"
import axios from "axios"

export const getEntitiesBySupplyChainId = async(supplyChain) => {
    try{
        const response = axios.get(`${initObject().initVariables}/entity/?supply_chain=${supplyChain}`, {
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
