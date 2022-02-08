import { initObject } from "../../components/initVariables/initObject"
import axios from "axios"
export const postSupplyChainDetails = async(data) => {
     try{
        let res = await axios.post(initObject().initVariables+"/supplychain/",data,{
            headers: {
                Authorization: `Token ${initObject().token}`,
            }
        })
        // console.log('api response 🚀', res)
        return res.data
     }
     catch(error){
        console.error(error)
     }
}
