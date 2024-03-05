import axios from "../utils/axios-customize";
import { Party } from "../models/Party/Party";
import { Categories } from "../models/Party/Categories";

export const getAll = async (): Promise<Party[] | undefined> => {
  try {
    return await axios.get(`/api/v1/parties`);
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategory = async (): Promise<Categories[] | undefined> => {
  try {
    return await axios.get(`/api/v1/categories`);
  } catch (error) {
    console.log(error);
  }
};
