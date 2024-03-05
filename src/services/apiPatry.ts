import axios from "../utils/axios-customize";
import { Party } from "../models/Party/Party";
import { Categories } from "../models/Party/Categories";

export const getAll = async (): Promise<Party[] | undefined> => {
  return await axios.get(`/api/v1/parties`);
};

export const getAllCategory = async (): Promise<Categories[] | undefined> => {
  return await axios.get(`/api/v1/categories`);
};
