import axios from 'axios';
import { initObject } from "../components/initVariables/initObject";
export const postFlowArray = async(flowArray) => {
    axios.post(`${initObject().initVariables}/flow/`, flowArray,
        {
            headers: {
                Authorization: `Token ${initObject().token}`,
            }
        }).then((res) => {
            return true
        }).catch((error) => {
            console.error(error.response)
        });
}
