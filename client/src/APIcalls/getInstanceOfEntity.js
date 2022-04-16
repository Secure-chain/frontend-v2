import React from 'react'
import { initObject } from "../components/initVariables/initObject"
import axios from "axios"

const getInstanceOfEntity = async(EntityId) => {
    try{
        const response = axios.get(`${initObject().initVariables}/instancebyentity/${EntityId}`, {
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

export default getInstanceOfEntity


