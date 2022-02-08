import axios from 'axios';
import { initObject } from "../../components/initVariables/initObject";

export const postFlowArray = (flowArray) => {
    axios.post(`${initObject().initVariables}/flow/`, flowArray,
        {
            headers: {
                Authorization: `Token ${initObject().token}`,
            }
        }).then((res) => {
            console.log('api response 🚀', res)
        }).catch((error) => {
            console.error(error.response)
        });
}
