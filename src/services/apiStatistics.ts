import axios from "../utils/axios-customize";

export const getAllRevanue = async (date: string | [string, string]): Promise<any> => {
    return await axios.get(`/api/v1/stats/total-revanue?date=${date}`);
};

export const getAllBookings = async (date: string | [string, string]): Promise<any> => {
    return await axios.get(`/api/v1/stats/total-order?date=${date}`);
};

export const getStatisticsUser = async (): Promise<any> => {
    return await axios.get(`/api/v1/stats/user`);
};

export const getPartyStatistics = async (): Promise<any> => {
    return await axios.get(`/api/v1/stats/party`)
}

export const getTopParty = async (top: string): Promise<any> => {
    return await axios.get(`/api/v1/stats/hot-party?top=${top}`)
}