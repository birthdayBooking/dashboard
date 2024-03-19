import axios from "../utils/axios-customize";
import { Party } from "../models/Party/Party";
import { Categories } from "../models/Party/Categories";

export const getAll = async (): Promise<Party> => {
  return await axios.get(`/api/v1/parties`);
};

export const getAllCategory = async (): Promise<Categories> => {
  return await axios.get(`/api/v1/categories`);
};

export const addParty = async (party: Party) => {
  return await axios.post(`/api/v1/parties`, party)
}

export const deleteParty = async (id: string) => {
  return await axios.delete(`/api/v1/parties/${id}`)
}