import React from 'react'
import { initObject } from "../../components/initVariables/initObject"
import axios from "axios"

export const getEntityData = async(entityId) => {
  try{
    const response = await axios.get(`${initObject().initVariables}/entity/${entityId}`, {
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
