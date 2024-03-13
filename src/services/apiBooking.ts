import axios from "../utils/axios-customize";
import { Party } from "../models/Party/Party";

export const getAll = async (): Promise<Party> => {
  return await axios.get(`/api/v1/orders`);
};

