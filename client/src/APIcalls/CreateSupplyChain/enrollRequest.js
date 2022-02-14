import React from 'react'
import { initObject } from "../../components/initVariables/initObject"
import axios from "axios"

const enrollRequest = async(sendData) => {
    try{
        const response = await axios.post(`${initObject().initVariables}/instance/`, sendData,{
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

export default enrollRequest