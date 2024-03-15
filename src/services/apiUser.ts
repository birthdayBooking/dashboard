import axios from "../utils/axios-customize";
import { User } from "../models/User/User";

export const getAllUsers = async (): Promise<User> => {
  return await axios.get(`/api/v1/accounts`);
};
