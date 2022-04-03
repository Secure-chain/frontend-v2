import React from 'react'
import { initObject } from "../components/initVariables/initObject"
import axios from "axios"

const postFindPathData = async(supplychainId, entityID, data) => {
    try{
        const response = axios.post(`${initObject().initVariables}/optimization/${supplychainId}/${entityID}`,data, {
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

export default postFindPathData


