import axios from "../utils/axios-customize";

export const getAllRevanue = async (date: string | [string, string]): Promise<any> => {
    return await axios.get(`/api/v1/stats/total-revanue?date=${date}`);
};
