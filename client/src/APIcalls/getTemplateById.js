import { initObject } from "../components/initVariables/initObject";
import axios from "axios";
export const getTemplateById = async (id) => {
  try {
    const response = await axios.get(
      `${initObject().initVariables}/template/${id}/`,
      {
        headers: {
          Authorization: `Token ${initObject().token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.response);
  }
}