import { monthlyPlan } from "../page/dashboard/MonthlyBooking";
import { TopPartyType } from "../page/dashboard/TopParty";
import axios from "../utils/axios-customize";

export const getAllRevanue = async (
  date: string | [string, string]
): Promise<any> => {
  return await axios.get(`/api/v1/stats/total-revanue?date=${date}`);
};

export const getAllBookings = async (
  date: string | [string, string]
): Promise<any> => {
  return await axios.get(`/api/v1/stats/total-order?date=${date}`);
};

export const getStatisticsUser = async (): Promise<any> => {
  return await axios.get(`/api/v1/stats/user`);
};

export const getPartyStatistics = async (): Promise<any> => {
  return await axios.get(`/api/v1/stats/party`);
};

export const getTopParty = async (top: string): Promise<TopPartyType[]> => {
  return await axios.get(`/api/v1/stats/hot-party?top=${top}`);
};

export const getMonthlyBookingByYear = async (month: string): Promise<monthlyPlan[]> => {
  return await axios.get(`/api/v1/stats/monthly-booking/${month}`);
};
